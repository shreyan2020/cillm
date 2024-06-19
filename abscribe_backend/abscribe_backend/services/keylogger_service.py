from abscribe_backend.models.keylogger import KeyloggerActivity

def log_keylogger_activity(document_id, prolific_id, task_id, key_log, click_log):
    """
    Log keylogger activity including key logs, mouse logs, and click logs.

    Args:
        prolific_id (str): The ID from Prolific.
        task_id (str): The task ID.
        keylog (list[dict]): List of key log entries.
        # mouseLog (list[dict]): List of mouse log entries.
        clickLog (list[dict]): List of click log entries.

    Returns:
        KeyloggerActivity: The saved keylogger activity.
    """
    activity_log = KeyloggerActivity(
        document_id = document_id,
        prolific_id=prolific_id,
        task_id=task_id,
        key_log=key_log,
        # mouseLog=mouseLog,
        click_log=click_log
    )
    activity_log.save()
    return activity_log
