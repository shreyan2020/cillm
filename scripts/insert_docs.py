import pandas as pd
from pymongo import MongoClient
from datetime import datetime

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client['documents_db']
# db.create_collection("persuasive_texts")
collection = db['persuasive_texts']

collection.delete_many({})

df = pd.read_csv('./analysis/data/buckets_combined/master_docs_with_basic_formatting_0109.csv')
# df.head()
# Insert data
data_dict = df.to_dict("records")

# Insert data into MongoDB collection
collection.insert_many(data_dict)

print("Data inserted successfully")
