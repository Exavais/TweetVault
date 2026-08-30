import type { Tweet } from "../types/tweet";


interface Props {
    tweet: Tweet;
}


export default function TweetCard({ tweet }: Props) {

    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "12px",
                maxWidth: "600px",
            }}
        >

            <div>
                <strong>
                    @{tweet.author}
                </strong>
            </div>


            <p>
                {tweet.content}
            </p>


            {
                tweet.tweet_created_at &&
                <small>
                    Posted:
                    {" "}
                    {new Date(tweet.tweet_created_at)
                        .toLocaleString()}
                </small>
            }


            <br />


            <small>
                Saved:
                {" "}
                {new Date(tweet.saved_at)
                    .toLocaleString()}
            </small>


        </div>
    );
}