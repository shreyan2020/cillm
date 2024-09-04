from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client['documents_db']
collection = db['persuasive_texts']

# Update all documents to set view_count to 0
result = collection.update_many(
    {},  # Empty filter matches all documents
    {"$set": {"view_count": 0}}  # Set view_count to 0
)

# Print the number of documents that were updated
print(f"{result.modified_count} documents updated with view_count set to 0.")
