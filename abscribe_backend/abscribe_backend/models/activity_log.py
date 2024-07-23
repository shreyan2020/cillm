from abscribe_backend.database.mongo_connection import db

class ActivityLog(db.Document):
    document_id = db.StringField(required=True)
    task_id = db.StringField(required=True)
    prolific_id = db.StringField(required=True)
    activity_log = db.DictField(required=True)  # Changed to DictField to accommodate the new structure
    timestamp = db.DateTimeField()

    def to_dict(self):
        return {
            "_id": str(self.id),
            "document_id": self.document_id,
            "task_id": self.task_id,
            "prolific_id": self.prolific_id,
            "activity_log": self.activity_log,
            "timestamp": self.timestamp,
        }
