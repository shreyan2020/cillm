# from gpt4all import GPT4All

# def get_chat(messages, func = 'generate'):
#     from ..app import app  # Purely for logging.

#     """Send a request to the ChatGPT api for a chat completion, given the messages as a list.
#     Message objects should be formatted: {role: "my_role", content: "some content"}."""
#     # app.logger.info(f"GPT receives: {messages} as messages.")
#     model = GPT4All("Nous-Hermes-2-Mistral-7B-DPO.Q4_0.gguf")
#     if func!='generate':
#         response = model.generate(prompt=messages, max_tokens=5, temp=0.4, repeat_penalty=1, repeat_last_n=5)
#     else:
#         response = model.generate(prompt=messages, max_tokens=100)
#     return response



# def get_chat(model, tokenizer, messages, func='generate'):
#     """Generate a chat response using the Hugging Face transformers model."""
#     try:
#         prompt = f"{messages}"  # Construct the prompt based on the messages
#         inputs = tokenizer(prompt, return_tensors="pt").to(device)
#         generated_ids = model.generate(inputs['input_ids'], max_new_tokens=100, do_sample=True)
#         generated_text = tokenizer.decode(generated_ids[0], skip_special_tokens=True)
        
#         return generated_text.strip()
#     except Exception as e:
#         print('Error in get_chat function:', e)
#         raise