db = db.getSiblingDB('documents_db');

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
    "_id": ObjectId("664fbafeb138bf10f0025823"),
    "frontend_id": "recipe_Loss_Anecdotal",
    "name": "Loss Framing with Anecdotal Information",
    "prompt": "Rewrite the sentence(s) to include a negative anecdotal story that highlights the consequences of not taking action. For example, change 'Your donation can help provide food for the hungry.' to 'Without your donation, families like the Johnsons will continue to struggle with hunger, unable to find their next meal.'",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "{'documentId': '664fbacdb138bf10f0025813'}"
  },
  {
    "_id": ObjectId("664fbafeb138bf10f0025817"),
    "frontend_id": "recipe_Gain_Statistics",
    "name": "Gain Framing with Statistics",
    "prompt": "Rewrite the sentence(s) to emphasize the positive outcomes using statistics. For example, change 'Your donation can help support our cause.' to 'Thanks to your support, we have been able to provide education to over 1 million children, helping them build a better future.'",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "{'documentId': '664fbacdb138bf10f0025813'}"
  },
  {
    "_id": ObjectId("664fbafeb138bf10f0025818"),
    "frontend_id": "recipe_Loss_Statistics",
    "name": "Loss Framing with Statistics",
    "prompt": "Rewrite the sentence(s) to highlight the negative consequences using statistics. For example, change 'Your donation can help support our cause.' to 'Without your support, millions of children will continue to suffer from lack of education, leading to a lifetime of poverty.'",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "{'documentId': '664fbacdb138bf10f0025813'}"
  },
  {
    "_id": ObjectId("664fbafeb138bf10f0025816"),
    "frontend_id": "recipe_ShortTerm",
    "name": "Short-term Temporal Framing",
    "prompt": "Rewrite the sentence(s) to emphasize the immediate impact of the donation. For example, change 'Your donation can help provide food for the hungry.' to 'Your donation today will provide meals for hungry families tomorrow, ensuring they have the nourishment they need right away.'",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "{'documentId': '664fbacdb138bf10f0025813'}"
  },
 
  {
    "_id": ObjectId("664fbafeb138bf10f0025819"),
    "frontend_id": "recipe_LongTerm",
    "name": "Long-term Temporal Framing",
    "prompt": "Rewrite the sentence(s) to emphasize the long-term impact of the donation. For example, change 'Your donation can help those in need.' to 'Your support will provide lasting education and opportunities for generations, helping break the cycle of poverty.'",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "{'documentId': '664fbacdb138bf10f0025813'}"
  },

]);
