from datetime import datetime

from abscribe_backend.database.mongo_connection import db
from abscribe_backend.models.feedback_item import FeedbackItem
from abscribe_backend.models.version import Version
DUMMY_DATE = datetime(1, 1, 1)


# Concrete class for Feedback items for Versions
class FeedbackItemVersion(FeedbackItem):
    ref_id = db.StringField(required=True)

    def to_dict(self):
        return {
            "_id": str(self.id),
            "ref_id": self.ref_id,
            "content": self.content,
            "timestamp": self.timestamp.isoformat() if self.timestamp is not None else "Unknown?"
        }
