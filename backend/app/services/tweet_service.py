from datetime import datetime


tweets = [
    {
        "id": 1,
        "author": "example_user",
        "content": "Hello TweetVault!",
        "tweet_time": datetime.now()
    }
]


def get_tweets():
    return tweets
