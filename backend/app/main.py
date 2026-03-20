from fastapi import FastAPI
from app.routes import chat, history

app = FastAPI()

app.include_router(chat.router, prefix="/chat")
app.include_router(history.router, prefix="/history")

@app.get("/")
def root():
    return {"message": "API running"}