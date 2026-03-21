from fastapi import APIRouter

router = APIRouter()

history = []

@router.get("/")
def get_history():
    return history

@router.post("/")
def add_event(event: dict):
    history.append(event)
    return {"status": "ok"}