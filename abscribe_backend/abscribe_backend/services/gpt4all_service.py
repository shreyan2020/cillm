from gpt4all import GPT4All

def get_chat(messages):
    from ..app import app  # Purely for logging.

    """Send a request to the ChatGPT api for a chat completion, given the messages as a list.
    Message objects should be formatted: {role: "my_role", content: "some content"}."""
    # app.logger.info(f"GPT receives: {messages} as messages.")
    model = GPT4All("Nous-Hermes-2-Mistral-7B-DPO.Q4_0.gguf", device='gpu')
    response = model.generate(prompt=messages, temp=0)
    return response
