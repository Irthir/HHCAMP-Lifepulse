from fastapi import APIRouter
from app.models.schemas import ConsentInput
from app.services.history_service import update_consent

router = APIRouter()

@router.post("/event/{event_id}/consent")
def consent(event_id: str, data: ConsentInput):
    return update_consent(event_id, data.consent)