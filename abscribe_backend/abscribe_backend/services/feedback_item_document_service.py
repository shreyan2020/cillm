from abscribe_backend.models.feedback_item_doc import FeedbackItemDocument
from abscribe_backend.models.feedback_list import FeedbackList
from abscribe_backend.services.document_service import get_document
from abscribe_backend.services.feedback_list_service import add_feedback_to_list, remove_feedback_from_list
from typing import List, Optional


def add_doc_feedback(document_id: str, feedback_data: dict) -> Optional[FeedbackItemDocument]:
    document = get_document(document_id)
    if document:
        feedback = FeedbackItemDocument(content=feedback_data["content"], ref_id=document)
        feedback.save()
        feedback_list = FeedbackList.objects(doc_id=document_id).first()
        if not feedback_list:
            feedback_list = FeedbackList(doc_id=document)
            feedback_list.feedback_item_list = []
            feedback_list.save()

        add_feedback_to_list(feedback_list.id, feedback)
        feedback_list.save()
        
        return feedback
    return None


def remove_doc_feedback(document_id: str, feedback_id: str) -> Optional[FeedbackItemDocument]:
    feedback_list = FeedbackList.objects(doc_id=document_id).first()
    if feedback_list:
        for i in feedback_list.feedback_item_list:
            if str(i.id) == str(feedback_id):
                feedback = i
                break
        if feedback:
            remove_feedback_from_list(feedback_list.id, feedback_list.feedback_item_list.index(feedback))
            feedback_list.save()
            return feedback
    return None

def get_doc_feedbacks(document_id: str) -> Optional[List[FeedbackItemDocument]]:
    feedback_list = FeedbackList.objects(doc_id=document_id).first()
    if feedback_list:
        return feedback_list.feedback_item_list
    return None


def get_doc_feedback(document_id: str, feedback_id: str) -> Optional[FeedbackItemDocument]:
    feedback_list = FeedbackList.objects(doc_id=document_id).first()
    if feedback_list:
        for feedback in feedback_list.feedback_item_list:
            if str(feedback.id) == str(feedback_id):
                return feedback
    return None