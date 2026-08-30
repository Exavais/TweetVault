import type { Tweet } from "../types/tweet";
import MediaPreview from "./MediaPreview";
import MediaGrid from "./MediaGrid";


interface Props {
    tweet: Tweet;
}


export default function TweetCard({tweet}: Props){

    return (
        <div
            style={{
                border:"1px solid #ddd",
                borderRadius:"12px",
                padding:"16px",
                marginBottom:"16px"
            }}
        >

            <h3>
                @{tweet.author}
            </h3>


            <p>
                {tweet.content}
            </p>


            {
                <MediaGrid
                    media={tweet.media}
                />
            }


            <div
                style={{
                    marginTop:"12px",
                    fontSize:"12px",
                    color:"#666"
                }}
            >

                <div>
                    Posted:
                    {" "}
                    {
                        tweet.tweet_created_at
                        ?
                        new Date(
                            tweet.tweet_created_at
                        ).toLocaleString()
                        :
                        "-"
                    }
                </div>


                <div>
                    Saved:
                    {" "}
                    {
                        new Date(
                            tweet.saved_at
                        ).toLocaleString()
                    }
                </div>

            </div>


        </div>
    )
}