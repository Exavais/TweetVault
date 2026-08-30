from sqlalchemy.orm import Session

from .models import Archive
from .schemas import ArchiveCreate

from .models import Media
from .models import Tag
from .models import ArchiveTag
from .models import Comment

from sqlalchemy import or_


def create_archive(
    db: Session,
    archive
):

    db_archive = Archive(
        url=archive.url,
        author=archive.author,
        content=archive.content,
        tweet_created_at=archive.tweet_created_at
    )

    db.add(db_archive)

    db.commit()

    db.refresh(db_archive)

    return db_archive



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



def create_comment(
    db: Session,
    archive_id: int,
    content: str
):

    comment = Comment(
        archive_id=archive_id,
        content=content
    )

    db.add(comment)
    db.commit()
    db.refresh(comment)

    return comment



def get_comments(
    db: Session,
    archive_id: int
):

    return (
        db.query(Comment)
        .filter(
            Comment.archive_id == archive_id
        )
        .all()
    )



def update_comment(
    db: Session,
    comment_id: int,
    content: str
):

    comment = (
        db.query(Comment)
        .filter(
            Comment.id == comment_id
        )
        .first()
    )

    if comment:

        comment.content = content

        db.commit()

        db.refresh(comment)

    return comment



def delete_comment(
    db: Session,
    comment_id: int
):

    comment = (
        db.query(Comment)
        .filter(
            Comment.id == comment_id
        )
        .first()
    )

    if comment:

        db.delete(comment)

        db.commit()

    return comment



def search_archives(
    db: Session,
    author: str | None = None,
    keyword: str | None = None,
    tag: str | None = None,
    comment: str | None = None,
    tweet_start=None,
    tweet_end=None,
    saved_start=None,
    saved_end=None
):

    query = db.query(Archive)


    # 作者搜索
    if author:

        query = query.filter(
            Archive.author.contains(author)
        )


    # 文案关键词
    if keyword:

        query = query.filter(
            Archive.content.contains(keyword)
        )


    # 推文发布时间
    if tweet_start:

        query = query.filter(
            Archive.tweet_created_at >= tweet_start
        )


    if tweet_end:

        query = query.filter(
            Archive.tweet_created_at <= tweet_end
        )


    # 保存时间
    if saved_start:

        query = query.filter(
            Archive.saved_at >= saved_start
        )


    if saved_end:

        query = query.filter(
            Archive.saved_at <= saved_end
        )


    # Tag 搜索
    if tag:

        query = (
            query
            .join(
                ArchiveTag,
                Archive.id == ArchiveTag.archive_id
            )
            .join(
                Tag,
                Tag.id == ArchiveTag.tag_id
            )
            .filter(
                Tag.name.contains(tag)
            )
        )


    # Comment 搜索
    if comment:

        query = (
            query
            .join(
                Comment,
                Archive.id == Comment.archive_id
            )
            .filter(
                Comment.content.contains(comment)
            )
        )


    return query.distinct().all()



def get_timeline(
    db: Session,
    author: str | None = None
):

    query = db.query(Archive)


    if author:

        query = query.filter(
            Archive.author.contains(author)
        )


    return (
        query
        .order_by(
            Archive.tweet_created_at.desc()
        )
        .all()
    )