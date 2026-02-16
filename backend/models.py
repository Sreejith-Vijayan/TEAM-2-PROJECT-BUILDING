from sqlalchemy import Column, Integer, String, Text, DateTime , Float
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.sql import func
from .database import Base

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    location = Column(String, index=True)
    image_url = Column(String)
    contact_info = Column(String)

    status = Column(String, default="active")

    # Store embedding as float array
    embedding = Column(ARRAY(Float))

    created_at = Column(DateTime(timezone=True), server_default=func.now())
