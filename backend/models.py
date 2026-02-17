from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from .database import Base


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    type = Column(String(10), index=True)            # "lost" or "found"
    title = Column(String(200), index=True)
    description = Column(Text)
    location = Column(String(200), index=True)
    date = Column(String(20))                         # User-reported date YYYY-MM-DD
    contact = Column(String(200))                     # Email or phone
    photo_path = Column(String(500), nullable=True)   # Relative path to uploaded photo
    status = Column(String(20), default="open")       # "open" or "resolved"
    user = Column(String(200), index=True)            # Reporter's email
    embedding = Column(Text, nullable=True)           # JSON-serialized float array
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String(200), unique=True, index=True)
    password_hash = Column(String(200))
