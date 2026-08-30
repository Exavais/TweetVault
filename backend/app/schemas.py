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