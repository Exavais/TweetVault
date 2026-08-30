from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import DateTime

from datetime import datetime

from .database import Base


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