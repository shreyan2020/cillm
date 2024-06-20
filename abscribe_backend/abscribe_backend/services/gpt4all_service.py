from gpt4all import GPT4All

def get_chat(messages, func = 'generate'):
    from ..app import app  # Purely for logging.

    """Send a request to the ChatGPT api for a chat completion, given the messages as a list.
    Message objects should be formatted: {role: "my_role", content: "some content"}."""
    # app.logger.info(f"GPT receives: {messages} as messages.")
    model = GPT4All("Nous-Hermes-2-Mistral-7B-DPO.Q4_0.gguf")
    if func!='generate':
        response = model.generate(prompt=messages, max_tokens=5, temp=0.4, repeat_penalty=1, repeat_last_n=5)
    else:
        response = model.generate(prompt=messages, max_tokens=100)
    return response