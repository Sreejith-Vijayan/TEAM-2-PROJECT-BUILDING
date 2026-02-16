from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ItemCreate(BaseModel):
    title: str
    description: str
    location: str
    image_url: str
    contact_info: str


class ItemResponse(BaseModel):
    id: int
    title: str
    description: str
    location: str
    image_url: str
    contact_info: str
    status: str
    created_at: datetime
    similarity: Optional[float] = None

    class Config:
        from_attributes = True
