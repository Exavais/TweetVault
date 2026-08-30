import { useEffect, useState } from "react";
import client from "../api/client";
import type { Tweet } from "../types/tweet";
import TweetCard from "../components/TweetCard";


export default function Timeline(){

    const [tweets,setTweets] = useState<Tweet[]>([]);


    useEffect(()=>{

        client
            .get("/timeline")
            .then(res=>{
                setTweets(res.data);
            });

    },[]);


    return (
        <div>

            <h1>
                Timeline
            </h1>

            {
                tweets.map(tweet => (
                    <TweetCard
                        key={tweet.id}
                        tweet={tweet}
                    />
                ))
            }

        </div>
    );
}