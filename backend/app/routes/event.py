from fastapi import APIRouter
from datetime import datetime
from pydantic import BaseModel

from app.services.history_service import (
    save_events,
    load_history
)
from src.extractor import extract_events

router = APIRouter()


class Message(BaseModel):
    text: str
    date: str | None = None


@router.post("/chat")
def chat_endpoint(msg: Message):

    date = msg.date or datetime.now().isoformat()

    # 🔥 1. récupérer historique
    history = load_history()

    # 🔥 2. calcul ID dynamique
    start_id = len(history) + 1

    # 🔥 3. extraction avec ID unique
    events, _ = extract_events({
        "text": msg.text,
        "date": date
    }, start_id=start_id)

    # 🔥 4. sauvegarde
    if events:
        save_events(events)

    return {
        "message": msg.text,
        "events_detected": events
    }

from app.services.history_service import clear_history

@router.delete("/history")
def delete_history():
    clear_history()
    return {"status": "history cleared"}