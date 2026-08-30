import os

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from .database import Base
from .database import engine
from .database import get_db

from .schemas import ArchiveCreate
from .schemas import ArchiveResponse

from . import crud

from fastapi import UploadFile, File

from .models import Media
from .schemas import MediaResponse

from .storage import save_file


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


@app.post(
    "/api/media/upload",
    response_model=MediaResponse
)
def upload_media(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    path = save_file(file)


    media = Media(

        filename=file.filename,

        file_path=path,

        media_type=file.content_type,

        size=os.path.getsize(path),

        spoiler=True
    )


    db.add(media)

    db.commit()

    db.refresh(media)


    return media