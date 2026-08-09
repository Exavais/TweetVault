from fastapi import FastAPI


app = FastAPI(
    title="TweetVault API",
    description="Personal X archive system",
    version="0.1.0"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to TweetVault API"
    }
