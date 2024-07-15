# """A service that handles sending API requests to chatGPT, and receiving the response.
# The only issue is how we get the messages, but that's presumably done as well.
# Task
# """
import os
from dotenv import load_dotenv
# import openai
from ollama import Client



GPT_MODEL = "nous-hermes2:latest"
# load_dotenv()
# openai.api_key = os.environ["OPENAI_API_KEY"]

client = Client(host=os.environ["OLLAMA_HOST"])

def get_chat(messages, stream):
    from ..app import app  # Purely for logging.

    """Send a request to the ChatGPT api for a chat completion, given the messages as a list.
    Message objects should be formatted: {role: "my_role", content: "some content"}."""
    # app.logger.info(f"GPT receives: {messages} as messages.")
    chat_raw = client.generate(
        model=GPT_MODEL,
        prompt=messages, 
        stream=stream,
    )
    return chat_raw
