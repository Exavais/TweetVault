from fastapi import APIRouter

from app.services.tweet_service import get_tweets
from app.schemas.tweet import Tweet


router = APIRouter(
    prefix="/api/tweets",
    tags=["tweets"]
)


@router.get(
    "",
    response_model=list[Tweet]
)
def list_tweets():
    return get_tweets()
