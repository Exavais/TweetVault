import {
    useNavigate
} from "react-router-dom";


import type {
    Tweet
} from "../types/tweet";


import MediaGrid from "./MediaGrid";



interface Props {

    tweet: Tweet;

}



export default function TweetCard({

    tweet

}: Props){


    const navigate = useNavigate();



    return (

        <div


            onClick={()=>{

                navigate(
                    `/archives/${tweet.id}`
                );

            }}



            style={{

                padding:"16px",

                border:"1px solid #ddd",

                borderRadius:"12px",

                marginBottom:"12px",

                cursor:"pointer"

            }}

        >



            <h3>

                @{tweet.author}

            </h3>



            <p>

                {tweet.content}

            </p>





            {
                tweet.media &&

                tweet.media.length > 0 &&


                <div

                    onClick={

                        e=>{

                            e.stopPropagation();

                        }

                    }

                >

                    <MediaGrid

                        media={tweet.media}

                    />

                </div>

            }





            <div

                style={{

                    marginTop:"12px",

                    fontSize:"14px",

                    color:"#666"

                }}

            >

                <p>

                    Posted:

                    {" "}

                    {

                        tweet.tweet_created_at

                        ??

                        "-"

                    }

                </p>


                <p>

                    Saved:

                    {" "}

                    {

                        tweet.saved_at

                    }

                </p>


            </div>



        </div>

    );

}