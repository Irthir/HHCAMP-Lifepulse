from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import sys
import os

# =========================
# 🔥 PATH → ProjetIA
# =========================
BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../../ProjetIA")
)

SRC_DIR = os.path.join(BASE_DIR, "src")

sys.path.append(BASE_DIR)
sys.path.append(SRC_DIR)

# =========================
# 🔥 IMPORTS IA (CORRIGÉS)
# =========================
from extractor import extract_events
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
    partage: str  # "O" ou "N"

# =========================
# 🏠 ROOT
# =========================
@app.get("/")
def read_root():
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
        "events_detected": events
    }

# =========================
# 👤 VUE PATIENT
# =========================
@app.get("/patient/")
def patient_view():
    return get_patient_view()

# =========================
# 🩺 VUE MÉDECIN
# =========================
@app.get("/calendrier/")
def calendrier_endpoint():
    return get_doctor_view()

# =========================
# 🔒 CONSENTEMENT
# =========================
@app.post("/event/")
def event_endpoint(data: Consent):

    update_event_consent(data.index, data.partage)

    return {
        "status": "updated",
        "index": data.index,
        "partage": data.partage
    }