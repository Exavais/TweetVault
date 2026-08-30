import { useEffect, useState } from "react";
import client from "../api/client";
import type { Tweet } from "../types/tweet";


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
                tweets.map(tweet=>(
                    <div key={tweet.id}>

                        <h3>
                            {tweet.author}
                        </h3>

                        <p>
                            {tweet.content}
                        </p>

                    </div>
                ))
            }

        </div>
    );
}