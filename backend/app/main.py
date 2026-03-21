from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ✅ 1. créer l'app AVANT tout
app = FastAPI()

# ✅ 2. middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ 3. modèles de données
class Message(BaseModel):
    message: str

# ✅ 4. routes
@app.get("/")
def read_root():
    return {"message": "API running"}

@app.post("/chat/")
def chat_endpoint(msg: Message):
    # ici tu peux appeler ton bot ou retourner un message dummy
    user_message = msg.message
    bot_response = f"Tu as dit : {user_message}"  # remplacer par ton vrai bot
    return {"response": bot_response}