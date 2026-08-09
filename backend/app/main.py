from fastapi import FastAPI

from app.api import tweets


app = FastAPI(
    title="TweetVault API",
    version="0.1.0"
)


app.include_router(
    tweets.router
)


@app.get("/")
def root():
    return {
        "message": "Welcome to TweetVault API"
    }
