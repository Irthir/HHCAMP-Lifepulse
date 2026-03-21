from fastapi import APIRouter
from app.services.history_service import get_patient_history

router = APIRouter()

@router.get("/patient/history")
def patient_history():
    return get_patient_history()