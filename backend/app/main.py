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

from .schemas import TagCreate
from .schemas import TagResponse

from .schemas import CommentCreate
from .schemas import CommentUpdate
from .schemas import CommentResponse

from datetime import datetime

from .schemas import SearchResponse

from .schemas import TimelineResponse


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


@app.get(
    "/api/media/{id}",
    response_model=MediaResponse
)
def get_media(
    id:int,
    db:Session=Depends(get_db)
):

    return crud.get_media(
        db,
        id
    )


@app.patch(
    "/api/media/{id}/spoiler",
    response_model=MediaResponse
)
def toggle_spoiler(
    id:int,
    db:Session=Depends(get_db)
):

    return crud.toggle_media_spoiler(
        db,
        id
    )


@app.post(
    "/api/archives/{archive_id}/tags",
    response_model=TagResponse
)
def add_tag(
    archive_id: int,
    tag: TagCreate,
    db: Session = Depends(get_db)
):

    return crud.add_tag_to_archive(
        db,
        archive_id,
        tag.name
    )


@app.get(
    "/api/archives/{archive_id}/tags",
    response_model=list[TagResponse]
)
def list_tags(
    archive_id: int,
    db: Session = Depends(get_db)
):

    return crud.get_archive_tags(
        db,
        archive_id
    )


@app.delete(
    "/api/archives/{archive_id}/tags/{tag_id}"
)
def delete_tag(
    archive_id: int,
    tag_id: int,
    db: Session = Depends(get_db)
):

    crud.remove_tag_from_archive(
        db,
        archive_id,
        tag_id
    )


    return {
        "message": "deleted"
    }


@app.post(
    "/api/archives/{archive_id}/comments",
    response_model=CommentResponse
)
def create_comment(
    archive_id: int,
    comment: CommentCreate,
    db: Session = Depends(get_db)
):

    return crud.create_comment(
        db,
        archive_id,
        comment.content
    )


@app.get(
    "/api/archives/{archive_id}/comments",
    response_model=list[CommentResponse]
)
def list_comments(
    archive_id: int,
    db: Session = Depends(get_db)
):

    return crud.get_comments(
        db,
        archive_id
    )


@app.patch(
    "/api/comments/{comment_id}",
    response_model=CommentResponse
)
def update_comment(
    comment_id: int,
    comment: CommentUpdate,
    db: Session = Depends(get_db)
):

    return crud.update_comment(
        db,
        comment_id,
        comment.content
    )


@app.delete(
    "/api/comments/{comment_id}"
)
def remove_comment(
    comment_id: int,
    db: Session = Depends(get_db)
):

    crud.delete_comment(
        db,
        comment_id
    )

    return {
        "message": "deleted"
    }


@app.get(
    "/api/search",
    response_model=list[SearchResponse]
)
def search(
    author: str | None = None,
    keyword: str | None = None,
    tag: str | None = None,
    comment: str | None = None,

    tweet_start: datetime | None = None,
    tweet_end: datetime | None = None,

    saved_start: datetime | None = None,
    saved_end: datetime | None = None,

    db: Session = Depends(get_db)
):

    return crud.search_archives(
        db,

        author,
        keyword,

        tag,
        comment,

        tweet_start,
        tweet_end,

        saved_start,
        saved_end
    )


@app.get(
    "/api/timeline",
    response_model=list[TimelineResponse]
)
def timeline(
    author: str | None = None,
    db: Session = Depends(get_db)
):

    return crud.get_timeline(
        db,
        author
    )