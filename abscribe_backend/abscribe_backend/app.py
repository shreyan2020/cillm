# Import CORS at the top of your file
import json
import os
from typing import Optional, List
from dotenv import load_dotenv
import re

from flask import Flask, request, Response, jsonify
# import torch
# from transformers import AutoTokenizer, AutoModelForCausalLM
# import abscribe_backend.services.gpt4all_service as gpt_service
import abscribe_backend.services.recipe_service as recipe_service

from abscribe_backend.models.document import Document
from flask_cors import CORS

from abscribe_backend.database.mongo_connection import db
from abscribe_backend.models.chunk import Chunk
from abscribe_backend.models.document import Document
# from abscribe_backend.models.keylogger import KeyloggerActivity



from abscribe_backend.models.version import Version

from abscribe_backend.services.keylogger_service import (
    log_keylogger_activity,
)

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

db.init_app(app)


# Helper function to convert objects to JSON serializable dictionaries
def to_dict(obj):
    return obj.to_mongo().to_dict() if obj else None



@app.route("/api/log_activity", methods=["POST"])
def log_activity_route() -> Response:
    
    document_id = request.json.get("document_id")
    prolific_id = request.json.get("prolific_id")
    task_id = request.json.get("task_id")
    key_log = request.json.get("key_log", [])
    # mouseLog = request.json.get("mouseLog", [])
    click_log = request.json.get("click_log", [])

    if not prolific_id or not task_id:
        return jsonify({"error": "prolific_id and task_id are required"}), 400

    activity_log = log_keylogger_activity(document_id, prolific_id, task_id, key_log, click_log)

    return Response(activity_log.to_json(), status=201, content_type="application/json")

# Document endpoints


@app.route("/api/documents", methods=["GET"])
def get_documents_route() -> Response:
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
#     print('hello',prompt)
#     chat_stream = gpt_service.get_chat(prompt)
#     print(chat_stream)
#     def stream_chat():
#         for chunk in chat_stream:
#             try:
#                 # content = chunk['choices'][0]['delta']['content']
#                 content = chunk
#                 newline = "\n"
#             except KeyError:
#                 content = ''
#             # 'data:' and newlines format each text block as a new server sent event. See the documentation on MDN.
#             yield f"data: {content}\n\n"
#             # Start a new paragraph if we see a newline.
#             # if '\n' in content:
#             #     if not tab and not lst:
#             #         yield f"data: <br/><br/>\n\n"
#             #     else:
#             #         yield f"data: \n\n"

#     return app.response_class(stream_chat(), mimetype="text/event-stream")

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
