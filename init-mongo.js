// Use the documents_db database (it will be created if it doesn't exist)
db = db.getSiblingDB('documents_db');

// Create the recipe collection and insert documents
db.createCollection('recipe');

db.recipe.insertMany([
  {
    "_id": ObjectId("664fbafeb138bf10f0025815"),
    "frontend_id": "recipe_Gain_Anecdotal",
    "name": "Gain Framing with Anecdotal Information",
    "prompt": "Rewrite the sentence(s) to include a positive anecdotal story that highlights the benefits. For example, change 'Your donation can help provide food for the hungry.' to 'Thanks to donors like you, Sarah and her family were able to enjoy a nutritious meal and regain their strength and hope for a better future.'",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "{'documentId': '664fbacdb138bf10f0025813'}"
  },
  {
    "_id": ObjectId("664fbafeb138bf10f0025816"),
    "frontend_id": "recipe_Gain_ShortTerm",
    "name": "Gain Framing with Short-term Temporal Framing",
    "prompt": "Rewrite the sentence(s) to emphasize the immediate positive impact of the donation. For example, change 'Your donation can help provide food for the hungry.' to 'Your donation today will provide meals for hungry families tomorrow, ensuring they have the nourishment they need right away.'",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "{'documentId': '664fbacdb138bf10f0025813'}"
  },
  {
    "_id": ObjectId("664fbafeb138bf10f0025817"),
    "frontend_id": "recipe_Gain_LargeNumbers",
    "name": "Gain Framing with Large Numbers",
    "prompt": "Rewrite the sentence(s) to emphasize the positive outcomes using statistics with large numbers. For example, change 'Your donation can support our cause.' to 'Your support has helped us provide clean drinking water to over 500,000 people, drastically improving their health and quality of life.'",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "{'documentId': '664fbacdb138bf10f0025813'}"
  },
  {
    "_id": ObjectId("664fbafeb138bf10f0025818"),
    "frontend_id": "recipe_Loss_Statistical",
    "name": "Loss Framing with Statistical Information",
    "prompt": "Rewrite the sentence(s) to include statistical information and highlight the negative consequences of not taking action. For example, change 'Your donation can help those in need.' to 'Without your help, over 3 million people will continue to suffer from preventable diseases each year due to lack of clean water.'",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "{'documentId': '664fbacdb138bf10f0025813'}"
  },
  {
    "_id": ObjectId("664fbafeb138bf10f0025819"),
    "frontend_id": "recipe_Loss_LongTerm",
    "name": "Loss Framing with Long-term Temporal Framing",
    "prompt": "Rewrite the sentence(s) to emphasize the long-term negative consequences of not taking action. For example, change 'Your donation can help those in need.' to 'If we don't act now, thousands of children will face a lifetime of illiteracy and poverty, affecting generations to come.'",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "{'documentId': '664fbacdb138bf10f0025813'}"
  },
  {
    "_id": ObjectId("664fbafeb138bf10f0025820"),
    "frontend_id": "recipe_Loss_SmallNumbers",
    "name": "Loss Framing with Small Numbers",
    "prompt": "Rewrite the sentence(s) to use small number statistics and highlight the negative impact. For example, change 'Your donation can make a difference.' to 'Without your support, 1 in 7 children will go to bed hungry tonight, enduring the severe consequences of malnutrition and poor health.'",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "{'documentId': '664fbacdb138bf10f0025813'}"
  }
]);
