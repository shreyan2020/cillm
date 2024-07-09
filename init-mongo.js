// Use the documents_db database (it will be created if it doesn't exist)
db = db.getSiblingDB('documents_db');

// Create the recipe collection and insert documents
db.createCollection('recipe');

db.recipe.insertMany([
  {
    "_id": ObjectId("664fbafeb138bf10f0025815"),
    "frontend_id": "recipe_Gain_Anecdotal",
    "name": "Gain Framing with Anecdotal Information",
    "prompt": "Rewrite the sentence(s) to include a positive anecdotal story that highlights the benefits.'",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "{'documentId': '664fbacdb138bf10f0025813'}"
  },
  {
    "_id": ObjectId("664fbafeb138bf10f0025816"),
    "frontend_id": "recipe_Gain_ShortTerm",
    "name": "Gain Framing with Short-term Temporal Framing",
    "prompt": "Rewrite the sentence(s) to emphasize the immediate positive impact of the donation.'",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "{'documentId': '664fbacdb138bf10f0025813'}"
  },
  {
    "_id": ObjectId("664fbafeb138bf10f0025817"),
    "frontend_id": "recipe_Gain_LargeNumbers",
    "name": "Gain Framing with Large Numbers",
    "prompt": "Rewrite the sentence(s) to emphasize the positive outcomes using statistics with large numbers.'",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "{'documentId': '664fbacdb138bf10f0025813'}"
  },
  {
    "_id": ObjectId("664fbafeb138bf10f0025818"),
    "frontend_id": "recipe_Loss_Statistical",
    "name": "Loss Framing with Statistical Information",
    "prompt": "Rewrite the sentence(s) to include statistical information and highlight the negative consequences of not taking action.",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "{'documentId': '664fbacdb138bf10f0025813'}"
  },
  {
    "_id": ObjectId("664fbafeb138bf10f0025819"),
    "frontend_id": "recipe_Loss_LongTerm",
    "name": "Loss Framing with Long-term Temporal Framing",
    "prompt": "Rewrite the sentence(s) to emphasize the long-term negative consequences of not taking action.",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "{'documentId': '664fbacdb138bf10f0025813'}"
  },
  {
    "_id": ObjectId("664fbafeb138bf10f0025820"),
    "frontend_id": "recipe_Loss_SmallNumbers",
    "name": "Loss Framing with Small Numbers",
    "prompt": "Rewrite the sentence(s) to use small number statistics and highlight the negative impact.",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "{'documentId': '664fbacdb138bf10f0025813'}"
  }
]);
