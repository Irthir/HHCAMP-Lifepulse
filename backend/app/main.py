from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ✅ 1. créer l'app AVANT tout
app = FastAPI()

# ✅ 2. ensuite ajouter les middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ 3. routes après
@app.get("/")
def read_root():
    return {"message": "API running"}