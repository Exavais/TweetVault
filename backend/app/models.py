from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import DateTime

from datetime import datetime

from .database import Base

from sqlalchemy import Boolean
from sqlalchemy import ForeignKey

from sqlalchemy import Table
from sqlalchemy import DateTime
from sqlalchemy.sql import func


class Archive(Base):

    __tablename__ = "archives"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    url = Column(
        String,
        unique=True
    )


    author = Column(
        String
    )


    content = Column(
        Text
    )


    tweet_created_at = Column(
    DateTime,
    nullable=True
)

    saved_at = Column(
        DateTime,
        default=datetime.utcnow
    )



class Media(Base):

    __tablename__ = "media"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    archive_id = Column(
        Integer,
        ForeignKey("archives.id")
    )


    filename = Column(
        String
    )


    file_path = Column(
        String
    )


    thumbnail_path = Column(
        String,
        nullable=True
    )


    media_type = Column(
        String
    )


    size = Column(
        Integer
    )


    spoiler = Column(
        Boolean,
        default=True
    )



class Tag(Base):

    __tablename__ = "tags"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        unique=True,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )



class ArchiveTag(Base):

    __tablename__ = "archive_tags"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    archive_id = Column(
        Integer,
        ForeignKey("archives.id"),
        nullable=False
    )

    tag_id = Column(
        Integer,
        ForeignKey("tags.id"),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )



class Comment(Base):

    __tablename__ = "comments"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    archive_id = Column(
        Integer,
        ForeignKey("archives.id"),
        nullable=False
    )

    content = Column(
        String,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )