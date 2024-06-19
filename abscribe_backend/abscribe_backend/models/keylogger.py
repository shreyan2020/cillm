from abscribe_backend.database.mongo_connection import db

class KeyloggerActivity(db.Document):
    document_id = db.StringField(required=True)
    prolific_id = db.StringField(required=True)
    task_id = db.StringField(required=True)
    key_log = db.ListField(db.DictField(), required=True)
    # mouseLog = db.ListField(db.DictField(), required=True)
    click_log = db.ListField(db.DictField(), required=True)

    def to_dict(self):
        return {
            "_id": str(self.id),
            "document_id": self.document_id,
            "prolific_id": self.prolific_id,
            "task_id": self.task_id,
            "key_log": self.key_log,
            # "mouseLog": self.mouseLog,
            "click_log": self.click_log,
        }