from pydantic import BaseModel


class ChatInput(BaseModel):
    text: str


class ConsentInput(BaseModel):
    consent: str