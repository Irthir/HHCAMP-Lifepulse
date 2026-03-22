from fastapi import FastAPI
from app.routes import chat, patient, event

app = FastAPI()

app.include_router(chat.router)
app.include_router(patient.router)
app.include_router(event.router)