from abscribe_backend.database.mongo_connection import db
# from datetime import datetime

class SurveyResponse(db.Document):
    prolific_id = db.StringField(required=True)
    study_id = db.StringField(required=True)
    task_id = db.StringField(required=True)
    responses = db.DictField(required=True)  # Dictionary field to store the survey responses
    timestamp = db.DateTimeField()  # Automatically set to the current time

    def to_dict(self):
        return {
            "_id": str(self.id),
            "prolific_id": self.prolific_id,
            "study_id": self.study_id,
            "task_id": self.task_id,
            "responses": self.responses,
            "timestamp": self.timestamp,
        }
