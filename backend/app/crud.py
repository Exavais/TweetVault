from sqlalchemy.orm import Session

from .models import Archive
from .schemas import ArchiveCreate

from .models import Media
from .models import Tag
from .models import ArchiveTag


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



def create_tag(
    db: Session,
    name: str
):

    tag = db.query(
        Tag
    ).filter(
        Tag.name == name
    ).first()


    if tag:
        return tag


    tag = Tag(
        name=name
    )

    db.add(tag)

    db.commit()

    db.refresh(tag)

    return tag



def add_tag_to_archive(
    db: Session,
    archive_id: int,
    tag_name: str
):

    tag = create_tag(
        db,
        tag_name
    )


    relation = ArchiveTag(
        archive_id=archive_id,
        tag_id=tag.id
    )


    db.add(relation)

    db.commit()


    return tag



def get_archive_tags(
    db: Session,
    archive_id: int
):

    return (
        db.query(Tag)
        .join(
            ArchiveTag,
            Tag.id == ArchiveTag.tag_id
        )
        .filter(
            ArchiveTag.archive_id == archive_id
        )
        .all()
    )



def remove_tag_from_archive(
    db: Session,
    archive_id: int,
    tag_id: int
):

    relation = (
        db.query(ArchiveTag)
        .filter(
            ArchiveTag.archive_id == archive_id,
            ArchiveTag.tag_id == tag_id
        )
        .first()
    )


    if relation:

        db.delete(relation)

        db.commit()


    return relation