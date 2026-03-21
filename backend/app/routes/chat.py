import sys
import os

sys.path.append(
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../../ProjetIA")
    )
)

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

    date = datetime.now().strftime("%Y-%m-%d")

    history = load_history()
    start_id = len(history) + 1

    events, _ = extract_events({
        "text": msg.text,
        "date": date
    }, start_id=start_id)

    if events:
        save_events(events)

    return {
        "message": msg.text,
        "events_detected": events
    }