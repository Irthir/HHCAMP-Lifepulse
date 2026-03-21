from fastapi import APIRouter
from app.models.schemas import ChatInput
from app.services.event_service import process_message

router = APIRouter()

@router.post("/chat")
def chat(data: ChatInput):
    return process_message(data.text)