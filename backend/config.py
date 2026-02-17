import os

# SQLite — no server needed, stores data in a file. Much easier to deploy.
_db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "lostfound.db")
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{_db_path}")

# Directory for uploaded photos
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)