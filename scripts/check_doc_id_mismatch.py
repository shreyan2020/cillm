import pandas as pd
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client['documents_db']
collection = db['persuasive_texts']

# Load CSV data
df = pd.read_csv('./analysis/data/buckets_combined/master_docs_with_basic_formatting_0109.csv')

# Insert data into MongoDB (assuming the data is already inserted, so skipping this step)
# If needed, uncomment the following lines to insert the data
# collection.delete_many({})
# data_dict = df.to_dict("records")
# collection.insert_many(data_dict)
# print("Data inserted successfully")

# Convert the CSV data into a dictionary for comparison
csv_data = df.set_index('_id').to_dict(orient='index')

# Retrieve the data from MongoDB
mongo_data = list(collection.find({}))
mongo_data_dict = {str(doc['_id']): {k: v for k, v in doc.items() if k != '_id'} for doc in mongo_data}

# Compare data from CSV and MongoDB
all_match = True
differences = []

for _id, csv_row in csv_data.items():
    mongo_row = mongo_data_dict.get(str(_id))
    
    if mongo_row != csv_row:
        all_match = False
        differences.append({
            "_id": _id,
            "csv_data": csv_row,
            "mongo_data": mongo_row
        })

if all_match:
    print("All records match between CSV and MongoDB.")
else:
    print(f"{len(differences)} records do not match between CSV and MongoDB.")
    for diff in differences:
        print(f"Difference for _id: {diff['_id']}")
        print(f"CSV Data: {diff['csv_data']}")
        print(f"MongoDB Data: {diff['mongo_data']}")
