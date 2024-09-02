# Import CORS at the top of your file
import json
import os
from typing import Optional, List
from dotenv import load_dotenv
import re
from datetime import datetime, timezone
from flask import Flask, request, Response, jsonify
import numpy as np
import logging


# import torch
# from transformers import AutoTokenizer, AutoModelForCausalLM
# import abscribe_backend.services.gpt4all_service as gpt_service
import abscribe_backend.services.recipe_service as recipe_service

from abscribe_backend.models.document import Document
from abscribe_backend.models.activity_log import ActivityLog
from abscribe_backend.models.donation_survey import DonationSurvey
from abscribe_backend.models.persuasive_texts import PersuasiveTexts

from flask_cors import CORS

from abscribe_backend.database.mongo_connection import db
from abscribe_backend.models.chunk import Chunk
from abscribe_backend.models.document import Document
from abscribe_backend.models.particiapnt_info import ParticipantInfo
from abscribe_backend.models.survey import SurveyResponse
import abscribe_backend.services.chatgpt_service as chatgpt_service
# from abscribe_backend.models.keylogger import KeyloggerActivity



from abscribe_backend.models.version import Version

# from abscribe_backend.services.usage_service import (
#     log_keylogger_activity,
#     log_gpt_response,
# )

from abscribe_backend.services.chunk_service import (
    add_chunk,
    remove_chunk,
    get_chunks,
    get_chunk,
)
from abscribe_backend.services.document_service import (
    create_document,
    get_documents,
    get_document,
    update_document,
    delete_document,
)
from abscribe_backend.services.version_service import (
    add_version,
    update_version,
    remove_version,
)

from abscribe_backend.services.feedback_item_document_service import (
    add_doc_feedback,
    remove_doc_feedback,
    get_doc_feedbacks,
    get_doc_feedback,
)

from abscribe_backend.services.feedback_item_chunk_service import (
    add_chunk_feedback,
    remove_chunk_feedback,
    get_chunk_feedbacks,
    get_chunk_feedback,
)

from abscribe_backend.services.feedback_item_version_service import (
    add_version_feedback,
    remove_version_feedback,
    get_version_feedbacks,
    get_version_feedback,
)

app = Flask(__name__)
load_dotenv()

app.config["MONGODB_SETTINGS"] = {
    "db": "documents_db",
    "host": os.environ.get("MONGO_HOST", "localhost"),
    "port": int(os.environ.get("MONGO_PORT", 27017)),
}

CORS(
    app,
    origins=[
        "http://127.0.0.1:5173",
        "https://abtestingtools-frontend.up.railway.app",
        "http://localhost:5173",
        "http://localhost",
        "http://145.38.194.189"
    ],
    resources={
        r"/*": {"origins": "*"}
    }
)

#load models

# model_name = "NousResearch/Hermes-2-Theta-Llama-3-70B-GGUF"  # Adjust model name as needed
# model_id = "TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF"
# filename = "tinyllama-1.1b-chat-v1.0.Q6_K.gguf"
# tokenizer = AutoTokenizer.from_pretrained(model_id, gguf_file=filename)
# model = AutoModelForCausalLM.from_pretrained(model_id, gguf_file=filename)
# # model = None
# # device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# device = "cuda"
# model.to(device)
logging.basicConfig(filename='fetch_log.txt', level=logging.INFO, format='%(asctime)s %(message)s')

db.init_app(app)


# Helper function to convert objects to JSON serializable dictionaries
def to_dict(obj):
    return obj.to_mongo().to_dict() if obj else None








@app.route("/api/get_persuasive_text", methods=["POST"])
def get_persuasive_text():
    data = request.get_json()
    task_category = data.get("task_category")
    prolific_id = data.get("prolific_id")
    print('asdssa', data)
    if not all([task_category, prolific_id]):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        # Find a text that hasn't been viewed 5 times yet
        document = PersuasiveTexts.objects(task_category=task_category, view_count__lt=5).order_by("view_count").modify(
            inc__view_count=1,  # Increment view_count
            new=True  # Return the updated document
        )
        
        if document:
            logging.info(f"Prolific ID {prolific_id} fetched document ID {document.id}")
            print(document.view_count)
            return jsonify(document.to_dict()), 200
        else:
            logging.error(f"Prolific ID {prolific_id} faced error while fetching a document")
            return jsonify({"error": "No more texts available for this task"}), 404

    except Exception as e:
        print("Error retrieving persuasive text:", e)
        return jsonify({"error": str(e)}), 500



@app.route("/api/log_survey", methods=["POST"])
def save_survey_response():
    data = request.get_json()

    prolific_id = data.get("prolific_id")
    document_id = data.get("document_id")
    # task_id = data.get("task_id")
    # donationAmount = 
    responses = data.get("responses", {})

    if not all([prolific_id, document_id]):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        survey_response = DonationSurvey(
            prolific_id=prolific_id,
            document_id=document_id,
            # task_id=task_id,
            responses=responses,
            timestamp=datetime.now(timezone.utc),  # Set the current time in UTC
        )
        survey_response.save()

        return jsonify({"message": "Survey responses saved successfully"}), 200
    except Exception as e:
        print("Error saving survey responses:", e)
        return jsonify({"error": str(e)}), 500



@app.route("/api/log_activity", methods=["POST"])
def log_activity():
    data = request.get_json()
    print("Received data:", data)  # Print incoming data for debugging

    document_id = data.get("document_id")
    task_id = data.get("task_id")
    prolific_id = data.get("prolific_id")
    activity_log = data.get("activity_log", {})
    time_spent_outside = data.get("time_spent_outside", 0)  # Default to 0 if not provided

    if not all([document_id, task_id, prolific_id]):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        activity_log_entry = ActivityLog(
            document_id=document_id,
            task_id=task_id,
            prolific_id=prolific_id,
            activity_log=activity_log,
            timestamp=datetime.now(timezone.utc),
            time_spent_outside=int(time_spent_outside),  # Ensure this is stored as an integer
        )
        activity_log_entry.save()

        return jsonify({"message": "Activity logged successfully"}), 200
    except Exception as e:
        print("Error saving activity log:", e)  # Print the exception for debugging
        return jsonify({"error": str(e)}), 500




@app.route("/api/save_participant_info", methods=["POST"])
def save_participant_info():
    data = request.get_json()
    print("Received participant data:", data)  # Debugging

    prolific_id = data.get("prolific_id")
    study_id = data.get("study_id")
    age = data.get("age")
    gender = data.get("gender")
    english_proficiency = data.get("english_proficiency")
    spanish_proficiency = data.get("spanish_proficiency")

    if not all([prolific_id, study_id, age, gender]):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        participant_info = ParticipantInfo(
            prolific_id=prolific_id,
            study_id=study_id,
            age=age,
            gender=gender,
            english_proficiency=english_proficiency,
            spanish_proficiency=spanish_proficiency,
        )
        participant_info.save()

        return jsonify({"message": "Participant info saved successfully"}), 200
    except Exception as e:
        print("Error saving participant info:", e)  # Debugging
        return jsonify({"error": str(e)}), 500


# @app.route("/api/log_survey", methods=["POST"])
# def save_survey_response():
#     data = request.get_json()
#     # print("Received survey data:", data)  # Print incoming data for debugging

#     prolific_id = data.get("prolific_id")
#     study_id = data.get("study_id")
#     task_id = data.get("task_id")
#     responses = data.get("responses", {})

#     if not all([prolific_id, study_id, task_id]):
#         return jsonify({"error": "Missing required fields"}), 400

#     try:
#         survey_response = SurveyResponse(
#             prolific_id=prolific_id,
#             study_id=study_id,
#             task_id=task_id,
#             responses=responses,
#             timestamp=datetime.now(timezone.utc)  # Set the current time in UTC
#         )
#         survey_response.save()

#         return jsonify({"message": "Survey responses saved successfully"}), 200
#     except Exception as e:
#         print("Error saving survey responses:", e)  # Print the exception for debugging
#         return jsonify({"error": str(e)}), 500


# Document endpoints


@app.route("/api/documents", methods=["GET"])
def get_documents_route() -> Response:
    logging.info(f"called")
    documents: List[Document] = get_documents()
    response_data: List[dict] = [document.to_dict() for document in documents]
    return Response(json.dumps(response_data), content_type="application/json")


@app.route("/api/documents", methods=["POST"])
def create_document_route() -> Response:
    content: Optional[str] = request.json.get("content")
    name: Optional[str] = request.json.get("name")
    task_id: str = request.json.get("task_id")
    prolific_id: str = request.json.get("prolific_id")
    print(task_id, prolific_id)
    if content is None:
        return jsonify({"error": "Content is required"}), 400
    
    if task_id is None:
        return jsonify({"error": "Task Id is required"}), 400
    
    if prolific_id is None:
        return jsonify({"error": "Prolific Id is required"}), 400
    
    if name is None:
        document: Document = create_document(content, task_id, prolific_id)
    else:
        document: Document = create_document(content, name, task_id, prolific_id)

    return Response(document.to_json(), status=201, content_type="application/json")


@app.route("/api/documents/<document_id>", methods=["GET"])
def get_document_route(document_id: str) -> Response:
    document: Optional[Document] = get_document(document_id)
    if document:
        return Response(document.to_json(), content_type="application/json")
    else:
        return jsonify({"error": "Document not found"}), 404


@app.route("/api/documents/<document_id>", methods=["PUT"])
def update_document_route(document_id: str) -> Response:
    updated_content: Optional[str] = request.json.get("content")
    updated_name: Optional[str] = request.json.get("name")

    if updated_content is None and updated_name is None:
        return jsonify({"error": "Content and Name is required"}), 400

    updated_document: Optional[Document] = update_document(
        document_id, updated_content, updated_name
    )

    if updated_document:
        response_data: dict = updated_document.to_dict()
        return Response(json.dumps(response_data), content_type="application/json")
    else:
        return Response("Document not found", status=404)


@app.route("/api/documents/<document_id>", methods=["DELETE"])
def delete_document_route(document_id: str) -> Response:
    success: bool = delete_document(document_id)
    if success:
        return jsonify({"result": "Document deleted"}), 200
    else:
        return jsonify({"error": "Document not found"}), 404


# Chunk endpoints
@app.route("/api/documents/<document_id>/chunks", methods=["GET"])
def get_chunks_route(document_id: str) -> Response:
    chunks: Optional[list[Chunk]] = get_chunks(document_id)
    if chunks is not None:
        response_data = [chunk.to_dict() for chunk in chunks]
        return Response(json.dumps(response_data), content_type="application/json"), 200
    else:
        return jsonify({"error": "Document not found"}), 404


@app.route("/api/documents/<document_id>/chunks", methods=["POST"])
def add_chunk_route(document_id: str) -> Response:
    chunk_data: Optional[str] = request.json.get("chunk_data")
    if chunk_data is None:
        return jsonify({"error": "Chunk data is required"}), 400

    chunk: Optional[Chunk] = add_chunk(document_id, chunk_data)
    if chunk:
        return Response(chunk.to_json(), status=201, content_type="application/json")
    else:
        return jsonify({"error": "Document not found"}), 404


@app.route("/api/documents/<document_id>/chunks/<int:chunk_index>", methods=["GET"])
def get_chunk_route(document_id: str, chunk_index: int) -> Response:
    chunk: Optional[Chunk] = get_chunk(document_id, chunk_index)
    if chunk:
        return Response(chunk.to_json(), content_type="application/json"), 200
    else:
        return jsonify({"error": "Chunk not found"}), 404


@app.route("/api/documents/<document_id>/chunks/<int:chunk_index>", methods=["DELETE"])
def remove_chunk_route(document_id: str, chunk_index: int) -> Response:
    chunk: Optional[Chunk] = remove_chunk(document_id, chunk_index)
    if chunk:
        return Response(chunk.to_json(), content_type="application/json"), 200
    else:
        return jsonify({"error": "Chunk not found"}), 404


# Version endpoints
@app.route(
    "/api/documents/<document_id>/chunks/<int:chunk_index>/versions", methods=["POST"]
)
def add_version_route(document_id: str, chunk_index: int) -> Response:
    version_data: Optional[str] = request.json.get("version_data")
    if version_data is None:
        return jsonify({"error": "Version data is required"}), 400

    version: Optional[Version] = add_version(document_id, chunk_index, version_data)
    if version:
        return Response(version.to_json(), status=201, content_type="application/json")
    else:
        return jsonify({"error": "Failed to add version"}), 404


@app.route(
    "/api/documents/<document_id>/chunks/<int:chunk_index>/versions", methods=["PUT"]
)
def update_version_route(document_id: str, chunk_index: int) -> Response:
    version_data: Optional[dict] = request.json.get("version_data")
    version_index: Optional[int] = request.json.get("version_index")

    if version_data is None or "text" not in version_data or version_index is None:
        return jsonify({"error": "Version data and index are required"}), 400

    updated_text: str = version_data["text"]

    version: Optional[Version] = update_version(
        document_id, chunk_index, version_index, updated_text
    )
    if version:
        return Response(version.to_json(), content_type="application/json"), 200
    else:
        return jsonify({"error": "Version not found"}), 404


@app.route(
    "/api/documents/<document_id>/chunks/<int:chunk_index>/versions/<int:version_index>",
    methods=["DELETE"],
)
def remove_version_route(
        document_id: str, chunk_index: int, version_index: int
) -> Response:
    version: Optional[Version] = remove_version(document_id, chunk_index, version_index)
    if version:
        return Response(version.to_json(), content_type="application/json"), 200
    else:
        return jsonify({"error": "Version not found"}), 404

# @app.route("/api/chatGPT/chat", methods=['POST'])
# def generate_text():
#     data = request.get_json()
#     prompt = data['prompt']
#     messages = [
#         {
#             'role': 'user',
#             'content': prompt,
#         }
#     ]

#     async def async_stream_chat():
#         async for part in ollamaClient.chat(model='llama3', messages=messages, stream=True):
#             content = part['message']['content']
#             yield f"data: {content}\n\n"

#     def sync_stream_chat():
#         loop = asyncio.new_event_loop()
#         asyncio.set_event_loop(loop)
#         async_gen = async_stream_chat()
#         try:
#             while True:
#                 yield loop.run_until_complete(async_gen.__anext__())
#         except StopAsyncIteration:
#             pass

#     return Response(sync_stream_chat(), mimetype="text/event-stream")

# @app.route("/api/chatGPT/chat", methods=['POST'])
@app.route("/api/chatGPT/chat", methods=['POST'])
def generate_text():
    data = request.get_json()
    prompt = data.get('prompt')
    stream = data.get('stream', False)
    # feature = data.get('feature', "")
    # task_id = data.get('task_id', "")
    # prolific_id = data.get('prolific_id', "")
    # original_text = data.get("original_text", "")
    print('hello', stream)
    chat_stream = chatgpt_service.get_chat(prompt, stream)
    
    if stream:
        def stream_chat():
            for chunk in chat_stream:
                try:
                    content = chunk['response']
                except KeyError:
                    content = ''
                yield f"data: {content}\n\n"
                if '\n' in content:
                    yield f"data: \n\n"
        return app.response_class(stream_chat(), mimetype="text/event-stream")
    else:
        # content = ""
        # for chunk in chat_stream:
        #     try:
        #         content += chunk['response']
        #     except KeyError:
        #         continue
        return jsonify({'response': chat_stream['response']})
    
# def extract_relevant_text(output_text):
#     pattern = re.compile(r'\[\/INST\](.*?)<\/s>', re.DOTALL)
#     match = pattern.search(output_text)
#     return match.group(1).strip() if match else "No relevant text found"


# @app.route("/api/chatGPT/suggestions", methods=['POST'])
# def suggest_texts():
#     data = request.get_json()
#     prompt = data['prompt']
#     # print('Received prompt:', prompt)
#     try:
#         # suggestion = gpt_service.get_chat(tokenizer, prompt, 'suggest')
#         # prompt = f"{messages}"  # Construct the prompt based on the messages
#         # inputs = tokenizer(prompt, return_tensors="pt").to(device)
#         # generated_ids = model.generate(inputs['input_ids'], max_new_tokens=50, do_sample=True)
#         # generated_text = tokenizer.decode(generated_ids[0], skip_special_tokens=True)
#         # suggestions = extract_relevant_text(generate_text)
#         # return generated_text.strip()
        
#         inputs = tokenizer(prompt, return_tensors="pt")
#         outputs = model.generate(**inputs, max_new_tokens=20)
#         suggestions = tokenizer.decode(outputs[0], skip_special_tokens=True)
#         print('Generated suggestion:', suggestions)
#         return jsonify({'suggestion': suggestions.strip()})
    
#     except Exception as e:
#         print('Error generating text:', e)
#         return jsonify({'error': str(e)}), 500





# def suggest_texts():
#     data = request.get_json()
#     prompt = data['prompt']
#     print('hello', prompt)
#     chat_stream = gpt_service.get_chat(prompt,'suggest')
#     # chat_stream = 'temp replacements'
#     print(chat_stream)

    # Collect all the chunks into a single string
    # response_text = ''
    # for chunk in chat_stream:
    #     try:
    #         content = chunk  # or chunk['choices'][0]['delta']['content'] if you have nested content
    #         response_text += content
    #     except KeyError:
    #         continue

    # Return the collected text as a JSON response
    # return jsonify({'suggestion': chat_stream})

@app.route("/api/recipes/", defaults={'recipe_id': None}, methods=['GET']) # I think this is necessary because there are several routes pointing here so there will be a redirect to the backslash.
@app.route("/api/recipes/<string:recipe_id>", methods=['GET'])
def get_recipes(recipe_id: str) -> Response:
    """Endpoint for retrieving recipes from the database. If an id is passed in, a list of recipes matching that name
    will be retrieved. If an id is not passed in, every recipe will be retrieved."""
    if recipe_id is not None:
        recipe = recipe_service.get_recipe(recipe_id)
        if recipe:
            return recipe.to_dict()
        else:
            return Response("An error occurred when retrieving this recipe for some reason.", 500)
    else:
        recipes = recipe_service.get_recipes()
        if recipes:
            return recipes
        else:
            app.logger.info(
                "We found no recipes when trying to get them all. There may be an error but there could also" +
                "just be no recipes.")
            return []


@app.route("/api/recipes/create", methods=['POST'])
def create_recipe() -> Response:
    """Endpoint for adding recipes to the database. Send the data as part of the request body since it could be big."""
    data = request.get_json()
    recipe = recipe_service.create_recipe(data["id"], data["name"], data["prompt"], str(data["home_document_id"]))
    if recipe:
        return Response(response=recipe.to_dict(), status=200, mimetype="application/json")
    else:
        return Response("Something went wrong with recipe creation", 500)


@app.route("/api/recipes/update", methods=['POST'])
def update_recipe() -> Response:
    """Endpoint for updating recipes in the database. Send the data as part of the request body since it could be big."""
    data = request.get_json()
    recipe = recipe_service.update_recipe(data["recipe_id"], data["new_name"], data["new_prompt"])
    if recipe:
        return Response(response=recipe.to_dict(), status=200, mimetype="application/json")
    else:
        return Response(response="Something weird happened when we were trying to update the recipe.", status=500)


@app.route("/api/recipes/delete/<string:recipe_id>", methods=['DELETE'])
def delete_recipe(recipe_id: str) -> Response:
    """Endpoint for deleting a recipe from the database by a particular name."""
    success = recipe_service.delete_recipe(recipe_id)
    if success:
        return Response(status=200)
    else:
        return Response(response="Something went wrong when we tried deleting that recipe.", status=500)
    

# Document Feedback endpoints
@app.route("/api/documents/<document_id>/feedback", methods=["POST"])
def add_document_feedback_route(document_id: str) -> Response:
    """ Endpoint for adding feedback to a document."""
    feedback_data = request.json
    feedback = add_doc_feedback(document_id, feedback_data)
    if feedback:
        return Response(feedback.to_json(), status=201, content_type="application/json")
    else:
        return jsonify({"error": "Failed to add feedback"}), 404

@app.route("/api/documents/<document_id>/feedback", methods=["GET"])
def get_document_feedbacks_route(document_id: str) -> Response:
    """ Endpoint for getting all feedbacks for a document."""
    feedbacks = get_doc_feedbacks(document_id)
    if feedbacks is not None:
        response_data = [feedback.to_dict() for feedback in feedbacks]
        return Response(json.dumps(response_data), content_type="application/json"), 200
    else:
        return jsonify({"error": "Document not found"}), 404

@app.route("/api/documents/<document_id>/feedback/<feedback_id>", methods=["GET"])
def get_document_feedback_route(document_id: str, feedback_id: str) -> Response:
    """ Endpoint for getting a feedback for a document."""
    feedback = get_doc_feedback(document_id, feedback_id)
    if feedback:
        return Response(feedback.to_json(), content_type="application/json"), 200
    else:
        return jsonify({"error": "Feedback not found"}), 404
    
@app.route("/api/documents/<document_id>/feedback/<feedback_id>", methods=["DELETE"])
def remove_document_feedback_route(document_id: str, feedback_id: str) -> Response:
    """ Endpoint for removing a feedback for a document."""
    feedback = remove_doc_feedback(document_id, feedback_id)
    if feedback:
        return jsonify({"result": "Feedback removed"}), 200
    else:
        return jsonify({"error": "Feedback not found"}), 404

# Chunk Feedback endpoints
@app.route("/api/documents/<document_id>/chunks/<chunk_id>/feedback", methods=["POST"])
def add_chunk_feedback_route(document_id: str, chunk_id: str) -> Response:
    """ Endpoint for adding feedback to a chunk."""
    feedback_data = request.json
    feedback = add_chunk_feedback(document_id, chunk_id, feedback_data)
    if feedback:
        return Response(feedback.to_json(), status=201, content_type="application/json")
    else:
        return jsonify({"error": "Failed to add feedback"}), 404

@app.route("/api/documents/<document_id>/chunks/<chunk_id>/feedback", methods=["GET"])
def get_chunk_feedbacks_route(document_id: str, chunk_id: str) -> Response:
    """ Endpoint for getting all feedbacks for a chunk."""
    feedbacks = get_chunk_feedbacks(document_id, chunk_id)
    if feedbacks is not None:
        response_data = [feedback.to_dict() for feedback in feedbacks]
        return Response(json.dumps(response_data), content_type="application/json"), 200
    else:
        return jsonify({"error": "Chunk not found"}), 404


# Version feedback endpoints
@app.route("/api/documents/<document_id>/versions/<version_id>/feedback", methods=["POST"])
def add_version_feedback_route(document_id: str, version_id: str) -> Response:
    """ Endpoint for adding feedback to a version."""
    feedback_data = request.json
    feedback = add_version_feedback(document_id, version_id, feedback_data)
    if feedback:
        return Response(feedback.to_json(), status=201, content_type="application/json")
    else:
        return jsonify({"error": "Failed to add feedback"}), 404


@app.route("/api/documents/<document_id>/versions/<version_id>/feedback", methods=["GET"])
def get_version_feedbacks_route(document_id: str, version_id: str) -> Response:
    """ Endpoint for getting all feedbacks for a version."""
    feedbacks = get_version_feedbacks(document_id, version_id)
    if feedbacks is not None:
        response_data = [feedback.to_dict() for feedback in feedbacks]
        return Response(json.dumps(response_data), content_type="application/json"), 200
    else:
        return jsonify({"error": "Version not found"}), 404



def main():
    app.run(host="0.0.0.0", port=8080, debug=True)


if __name__ == "__main__":
    main()
