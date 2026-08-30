from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from .database import Base
from .database import engine
from .database import get_db

from .schemas import ArchiveCreate
from .schemas import ArchiveResponse

from . import crud


Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title="TweetVault API",
    version="0.1.0"
)


@app.get("/")
def root():
    return {
        "status": "running"
    }


@app.post(
    "/api/archives",
    response_model=ArchiveResponse
)
def create_archive(
    archive: ArchiveCreate,
    db: Session = Depends(get_db)
):
    return crud.create_archive(
        db,
        archive
    )


@app.get(
    "/api/archives",
    response_model=list[ArchiveResponse]
)
def list_archives(
    db: Session = Depends(get_db)
):
    return crud.get_archives(db)


@app.get(
    "/api/archives/{id}",
    response_model=ArchiveResponse
)
def get_archive(
    id: int,
    db: Session = Depends(get_db)
):
    return crud.get_archive(
        db,
        id
    )


@app.delete(
    "/api/archives/{id}"
)
def delete_archive(
    id: int,
    db: Session = Depends(get_db)
):
    crud.delete_archive(
        db,
        id
    )

    return {
        "message": "deleted"
    }