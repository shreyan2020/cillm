import pandas as pd
from pymongo import MongoClient
from datetime import datetime

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client['documents_db']
# db.create_collection("persuasive_texts")
collection = db['persuasive_texts']
df = pd.read_csv('../data/buckets_combined/master_docs_with_control.csv')
# df.head()
# Insert data
data_dict = df.to_dict("records")

# Insert data into MongoDB collection
collection.insert_many(data_dict)

print("Data inserted successfully")
