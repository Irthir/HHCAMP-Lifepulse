# routes/chat.py

from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_service import process_message
from datetime import datetime

router = APIRouter()

class Message(BaseModel):
    text: str
    date: str | None = None


@router.post("/")
def chat(msg: Message):

    date = msg.date or datetime.now().isoformat()

    events = process_message(msg.text, date)

    return {
        "input": msg.text,
        "events": events
    }