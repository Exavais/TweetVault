from pydantic import BaseModel
from datetime import datetime
from pydantic import BaseModel, Field


class ArchiveCreate(BaseModel):

    url: str

    author: str

    content: str

    tweet_created_at: datetime | None = None



class MediaResponse(BaseModel):

    id: int

    filename: str

    file_path: str

    media_type: str

    size: int

    spoiler: bool


    class Config:
        from_attributes = True



class ArchiveResponse(BaseModel):

    id: int

    url: str

    author: str

    content: str

    tweet_created_at: datetime | None

    saved_at: datetime

    media: list[MediaResponse] = Field(default_factory=list)


    class Config:
        from_attributes = True



class TagCreate(BaseModel):

    name: str



class TagResponse(BaseModel):

    id: int

    name: str


    class Config:
        from_attributes = True



class CommentCreate(BaseModel):

    content: str



class CommentUpdate(BaseModel):

    content: str



class CommentResponse(BaseModel):

    id: int

    archive_id: int

    content: str

    created_at: datetime

    updated_at: datetime


    class Config:
        from_attributes = True



class SearchResponse(BaseModel):

    id: int

    url: str

    author: str

    content: str

    tweet_created_at: datetime | None

    saved_at: datetime


    class Config:
        from_attributes = True



class TimelineResponse(BaseModel):

    id: int

    author: str

    content: str

    tweet_created_at: datetime | None

    saved_at: datetime

    media: list[MediaResponse] = Field(default_factory=list)


    class Config:
        from_attributes = True