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



function formatDate(
    date: string | null | undefined
){

    if(!date){

        return "-";

    }


    return new Date(date)

        .toLocaleString(

            undefined,

            {

                year:"numeric",

                month:"2-digit",

                day:"2-digit",

                hour:"2-digit",

                minute:"2-digit",

                second:"2-digit"

            }

        );

}





export default function TweetCard({

    tweet

}: Props){


    const navigate =
        useNavigate();




    return (

        <div

            onClick={()=>{

                navigate(
                    `/archives/${tweet.id}`
                );

            }}


            style={{

                width:"100%",

                boxSizing:"border-box",

                padding:"16px",

                border:"1px solid #ddd",

                borderRadius:"12px",

                marginBottom:"12px",

                cursor:"pointer"

            }}

        >




            {/* Header */}

            <div

                style={{

                    display:"flex",

                    justifyContent:"space-between",

                    alignItems:"flex-start"

                }}

            >



                {/* User */}

                <div

                    style={{

                        display:"flex",

                        alignItems:"center",

                        gap:"12px"

                    }}

                >



                    {

                        tweet.user.avatar_path &&

                        <img

                            src={
                                `http://127.0.0.1:8000/${tweet.user.avatar_path}`
                            }

                            alt="avatar"

                            style={{

                                width:"48px",

                                height:"48px",

                                borderRadius:"50%",

                                objectFit:"cover"

                            }}

                        />

                    }




                    <div

                        style={{

                            textAlign:"left"

                        }}

                    >



                        <h3

                            style={{

                                margin:"0",

                                textAlign:"left"

                            }}

                        >

                            {

                                tweet.user.display_name

                                ??

                                tweet.user.username

                            }

                        </h3>




                        <div

                            style={{

                                color:"#666",

                                fontSize:"14px",

                                textAlign:"left"

                            }}

                        >

                            @

                            {

                                tweet.user.username

                            }

                        </div>



                    </div>




                </div>






                {/* Post time */}

                <div

                    style={{

                        color:"#666",

                        fontSize:"13px",

                        whiteSpace:"nowrap",

                        marginTop:"4px"

                    }}

                >

                    {

                        formatDate(

                            tweet.tweet_created_at

                        )

                    }

                </div>



            </div>








            {/* Content */}

            <p

                style={{

                    textAlign:"left",

                    lineHeight:"1.6"

                }}

            >

                {

                    tweet.content

                }

            </p>








            {/* Media */}

            {

                tweet.media &&

                tweet.media.length > 0 &&


                <div

                    onClick={

                        e=>e.stopPropagation()

                    }

                >

                    <MediaGrid

                        media={tweet.media}

                    />

                </div>

            }





        </div>

    );

}