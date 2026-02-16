from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import engine, SessionLocal
from . import models, schemas
from .embeddings import generate_embedding, cosine_similarity
from fastapi.middleware.cors import CORSMiddleware


models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Campus Digital Lost & Found")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ----------------------------
# CREATE ITEM
# ----------------------------
@app.post("/items/", response_model=schemas.ItemResponse)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):

    combined_text = f"{item.title}. {item.description}. Found at {item.location}"
    embedding = generate_embedding(combined_text)

    db_item = models.Item(
        title=item.title,
        description=item.description,
        location=item.location,
        image_url=item.image_url,
        contact_info=item.contact_info,
        embedding=embedding
    )

    db.add(db_item)
    db.commit()
    db.refresh(db_item)

    return db_item


# ----------------------------
# SEARCH ITEMS
# ----------------------------
@app.get("/search/", response_model=list[schemas.ItemResponse])
def search_items(query: str, db: Session = Depends(get_db)):

    query_embedding = generate_embedding(query)

    items = db.query(models.Item).filter(models.Item.status == "active").all()

    scored_items = []

    for item in items:
        similarity = cosine_similarity(query_embedding, item.embedding)

        scored_items.append((item, similarity))

    # Sort by similarity descending
    scored_items.sort(key=lambda x: x[1], reverse=True)

    top_results = scored_items[:5]

    response = []

    for item, similarity in top_results:
        response.append({
            "id": item.id,
            "title": item.title,
            "description": item.description,
            "location": item.location,
            "image_url": item.image_url,
            "contact_info": item.contact_info,
            "status": item.status,
            "created_at": item.created_at,
            "similarity": round(similarity, 3)
        })

    return response


# ----------------------------
# MARK AS CLAIMED
# ----------------------------
@app.put("/items/{item_id}/claim")
def mark_claimed(item_id: int, db: Session = Depends(get_db)):

    item = db.query(models.Item).filter(models.Item.id == item_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    item.status = "claimed"
    db.commit()

    return {"message": "Item marked as claimed"}
