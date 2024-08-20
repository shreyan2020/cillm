db = db.getSiblingDB('documents_db');

db.createCollection('recipe');

db.recipe.insertMany([
  {
    "_id": ObjectId("664fbafeb138bf10f0025815"),
    "frontend_id": "recipe_Gain_Anecdotal",
    "name": "Positive Narrative Framing",
    "prompt": "Rewrite the sentence(s) to include a positive anecdotal story that highlights the benefits",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "664fbacdb138bf10f0025813"
  },
  {
    "_id": ObjectId("664fbafeb138bf10f0025823"),
    "frontend_id": "recipe_Loss_Anecdotal",
    "name": "Cautionary Narrative Framing",
    "prompt": "Rewrite the sentence(s) to include a negative anecdotal story that highlights the consequences of not taking action",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "664fbacdb138bf10f0025813"
  },
  {
    "_id": ObjectId("664fbafeb138bf10f0025817"),
    "frontend_id": "recipe_Gain_Statistics",
    "name": "Positive Narrative Framing with Statistics",
    "prompt": "Rewrite the sentence(s) to emphasize the positive outcomes using statistics.",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "664fbacdb138bf10f0025813"
  },
  {
    "_id": ObjectId("664fbafeb138bf10f0025818"),
    "frontend_id": "recipe_Loss_Statistics",
    "name": "Cautionary Narrative with Statistics",
    "prompt": "Rewrite the sentence(s) to highlight the negative consequences using statistics.",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "664fbacdb138bf10f0025813"
  },
  {
    "_id": ObjectId("664fbafeb138bf10f0025816"),
    "frontend_id": "recipe_ShortTerm",
    "name": "Emphasis on Immediate Outcome",
    "prompt": "Rewrite the sentence(s) to emphasize the immediate impact of the donation.",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "664fbacdb138bf10f0025813"
  },
 
  {
    "_id": ObjectId("664fbafeb138bf10f0025819"),
    "frontend_id": "recipe_LongTerm",
    "name": "Emphasis on Long-Term Outcome",
    "prompt": "Rewrite the sentence(s) to emphasize the long-term impact of the donation.",
    "creation_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "edit_timestamp": new Date("2024-07-09T21:54:06.806Z"),
    "home_document_id": "664fbacdb138bf10f0025813"
  },

]);
