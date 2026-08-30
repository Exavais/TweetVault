from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import DateTime

from datetime import datetime

from .database import Base

from sqlalchemy import Boolean
from sqlalchemy import ForeignKey

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


    created_at = Column(
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