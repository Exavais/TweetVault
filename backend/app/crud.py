from sqlalchemy.orm import Session

from .models import Archive
from .schemas import ArchiveCreate

from .models import Media


def create_archive(
    db: Session,
    archive: ArchiveCreate
):

    item = Archive(
        url=archive.url,
        author=archive.author,
        content=archive.content
    )


    db.add(item)

    db.commit()

    db.refresh(item)

    return item



def get_archives(
    db: Session
):

    return db.query(
        Archive
    ).all()



def get_archive(
    db: Session,
    archive_id:int
):

    return db.query(
        Archive
    ).filter(
        Archive.id == archive_id
    ).first()



def delete_archive(
    db:Session,
    archive_id:int
):

    item = get_archive(
        db,
        archive_id
    )

    if item:
        db.delete(item)
        db.commit()

    return item



def get_media(
    db: Session,
    media_id: int
):

    return db.query(
        Media
    ).filter(
        Media.id == media_id
    ).first()



def toggle_media_spoiler(
    db: Session,
    media_id: int
):

    media = get_media(
        db,
        media_id
    )

    if media:

        media.spoiler = not media.spoiler

        db.commit()

        db.refresh(media)


    return media