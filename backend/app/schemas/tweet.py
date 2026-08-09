from pydantic import BaseModel
from datetime import datetime


class Tweet(BaseModel):
    id: int
    author: str
    content: str
    tweet_time: datetime
