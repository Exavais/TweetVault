from pydantic import BaseModel
from datetime import datetime


class ArchiveCreate(BaseModel):

    url: str

    author: str

    content: str



class ArchiveResponse(BaseModel):

    id: int

    url: str

    author: str

    content: str

    created_at: datetime


    class Config:
        from_attributes = True



class MediaResponse(BaseModel):

    id: int

    filename: str

    file_path: str

    media_type: str

    size: int

    spoiler: bool


    class Config:
        from_attributes = True



class TagCreate(BaseModel):

    name: str



class TagResponse(BaseModel):

    id: int

    name: str


    class Config:
        from_attributes = True