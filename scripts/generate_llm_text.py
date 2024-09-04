import random
import pandas as pd
from ollama import Client

# List of modifiers extracted from your data
modifiers = [
    "Positive Narrative Framing",
    "Cautionary Narrative Framing",
    "Positive Narrative Framing with Statistics",
    "Cautionary Narrative with Statistics",
    "Emphasis on Immediate Outcome",
    "Emphasis on Long-Term Outcome"
]

# Mission statement for WWF charity
control_text = """The mission of World Wildlife Fund is to conserve nature and reduce the most pressing threats to the diversity of life on Earth. Our vision is to build a future in which people live in harmony with nature.

We seek to save a planet, a world of life. Reconciling the needs of human beings and the needs of others that share the Earth, we seek to practice conservation that is humane in the broadest sense. We seek to instill in people everywhere a discriminating, yet unabashed, reverence for nature and to balance that reverence with a profound belief in human possibilities. From the smallest community to the largest multinational organization, we seek to inspire others who can advance the cause of conservation.

We seek to be the voice for those creatures who have no voice. We speak for their future. We seek to apply the wealth of our talents, knowledge, and passion to making the world wealthier in life, in spirit, and in living wonder of nature."""

# Create a string of modifiers to include in the prompt
modifiers_text = "You may or may not choose to use the following modifiers:\n" + "\n".join(modifiers)

# Prompt for LLM
prompt = f"Do not output anything else but the text you are requested output. Write a persuasive advertisement in SPANISH minimum 70 words for WWF charity based on the following mission statement: {control_text}.\n\n{modifiers_text}"

# List to store the LLM content
llm_content = []

# Connecting to the Ollama container via localhost
client = Client(host='http://localhost:11434')

# Generate and store text completions with random temperatures
for _ in range(16):  # Generate 16 outputs
    # Randomly select a temperature between 0 and 1
    temperature = round(random.uniform(0, 1), 2)
    
    # Generate text from the LLM with the selected temperature
    llm_text = client.generate(model='llama3.1', prompt=prompt, options={'temperature': temperature})
    
    # Create a dictionary to hold the LLM content
    llm_dict = {'_id': 'LLM', 'TASK_ID': 'ENG_LLM', 'content': llm_text['response'], 'temperature': temperature}  # Extracting the 'response' from the response
    llm_content.append(llm_dict)

# Store the generated content in a DataFrame and save as CSV
llm_storage = pd.DataFrame(llm_content)
llm_storage.to_csv('./llm_esp.csv', index=False)
