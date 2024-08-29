from abscribe_backend.database.mongo_connection import db
# from datetime import datetime

class PersuasiveTexts(db.Document):
    document_id = db.StringField(required=True)
    task_id = db.StringField(required=True)
    task_category = db.StringField(required=True)
    plain_text = db.StringField(required=True)
    view_count = db.IntField(default=0)
    timestamp = db.DateTimeField()
    
    def to_dict(self):
        return {
            "_id": str(self.id),
            "document_id": self.task_id,
            "task_id": self.task_id,
            "task_category": self.task_category,
            "plain_text": self.plain_text,
            "view_count": self.view_count,
            "timestamp": self.timestamp,
        }
