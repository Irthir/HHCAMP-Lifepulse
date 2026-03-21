from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import sys
import os

# 🔥 accès à ProjetIA
sys.path.append(
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../../ProjetIA")
    )
)

# 🔥 imports IA
from src.extractor import extract_events
from history import (
    save_events,
    get_patient_view,
    get_doctor_view,
    update_event_consent
)

# =========================
# 🚀 APP
# =========================
app = FastAPI()

# =========================
# 🌐 CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# 📦 MODELS
# =========================
class Message(BaseModel):
    text: str
    date: str | None = None


class Consent(BaseModel):
    index: int
    partage: bool  # True / False


# =========================
# 🏠 ROOT
# =========================
@app.get("/")
def root():
    return {"message": "LifePulse API running"}

# =========================
# 💬 CHAT → IA
# =========================
@app.post("/chat/")
def chat_endpoint(msg: Message):

    date = msg.date or datetime.now().isoformat()

    events, _ = extract_events({
        "text": msg.text,
        "date": date
    })

    if events:
        save_events(events)

    return {
        "input": msg.text,
        "events": events
    }

# =========================
# 🔒 CONSENTEMENT
# =========================
@app.post("/event/")
def event_endpoint(data: Consent):

    # 🔥 conversion bool → "O"/"N"
    partage = "O" if data.partage else "N"

    update_event_consent(data.index, partage)

    return {
        "status": "updated",
        "index": data.index,
        "partage": partage
    }

# =========================
# 📅 CALENDRIER (FRISE)
# =========================
@app.post("/calendrier/")
def calendrier_endpoint():

    events = get_doctor_view()

    if isinstance(events, str):
        return {"events": []}

    # 🔥 format timeline
    timeline = []

    for e in events:
        timeline.append({
            "date": e["date"],
            "title": e["titre"],
            "description": e["complement"]
        })

    # 🔥 tri par date
    timeline.sort(key=lambda x: x["date"])

    return {
        "timeline": timeline
    }