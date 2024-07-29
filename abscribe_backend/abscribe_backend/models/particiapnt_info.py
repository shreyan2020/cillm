from abscribe_backend.database.mongo_connection import db
from datetime import datetime, timezone

class ParticipantInfo(db.Document):
    prolific_id = db.StringField(required=True)
    study_id = db.StringField(required=True)
    age = db.IntField(required=True)
    gender = db.StringField(required=True)
    english_proficiency = db.StringField()
    spanish_proficiency = db.StringField()
    timestamp = db.DateTimeField(default=datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "_id": str(self.id),
            "prolific_id": self.prolific_id,
            "study_id": self.study_id,
            "age": self.age,
            "gender": self.gender,
            "english_proficiency": self.english_proficiency,
            "spanish_proficiency": self.spanish_proficiency,
            "timestamp": self.timestamp,
        }
