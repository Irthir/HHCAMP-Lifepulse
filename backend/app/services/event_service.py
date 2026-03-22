from datetime import datetime
from ProjetIA.src.extractor import extract_events
from app.services.history_service import save_events


def process_message(text: str):
    message = {
        "text": text,
        "date": datetime.now().isoformat()
    }

    events, _ = extract_events(message)

    if events:
        save_events(events)

    return {
        "message": text,
        "events_detected": events
    }