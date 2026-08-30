from sqlalchemy.orm import Session

from .models import Archive
from .schemas import ArchiveCreate



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