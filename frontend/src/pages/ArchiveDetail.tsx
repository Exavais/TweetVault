import {
    useEffect,
    useState
} from "react";


import {
    useParams
} from "react-router-dom";


import {
    getArchive
} from "../api/archive";


import {
    getTags,
    getComments
} from "../api/detail";


import MediaGrid from "../components/MediaGrid";


import type {
    Tweet
} from "../types/tweet";



function formatDate(
    date:string | null | undefined
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




export default function ArchiveDetail(){


    const {
        id
    } = useParams();



    const archiveId =
        Number(id);



    const [tweet,setTweet] =
        useState<Tweet | null>(null);



    const [tags,setTags] =
        useState<any[]>([]);



    const [comments,setComments] =
        useState<any[]>([]);





    useEffect(()=>{


        if(!id)

            return;



        getArchive(archiveId)
            .then(setTweet);



        getTags(archiveId)
            .then(setTags);



        getComments(archiveId)
            .then(setComments);



    },[id]);






    if(!tweet){

        return (

            <div>

                Loading...

            </div>

        );

    }






    return (

        <div

            style={{

                maxWidth:"800px",

                margin:"auto",

                padding:"20px"

            }}

        >



            <h2>

                @{tweet.author}

            </h2>





            <p>

                {tweet.content}

            </p>






            {

                tweet.media &&

                tweet.media.length > 0 &&


                <div

                    style={{

                        marginTop:"20px"

                    }}

                >

                    <MediaGrid

                        media={tweet.media}

                    />

                </div>

            }






            <hr/>






            <h3>

                Tags

            </h3>





            {

                tags.length === 0

                ?

                <p>

                    No tags

                </p>


                :

                tags.map(

                    tag=>(

                        <span

                            key={tag.id}

                            style={{

                                marginRight:"10px",

                                padding:"4px 8px",

                                borderRadius:"8px",

                                background:"#eee"

                            }}

                        >

                            #{tag.name}

                        </span>

                    )

                )

            }







            <hr/>







            <h3>

                Comments

            </h3>






            {

                comments.length === 0

                ?

                <p>

                    No comments

                </p>


                :

                comments.map(

                    comment=>(

                        <div

                            key={comment.id}

                            style={{

                                marginBottom:"10px"

                            }}

                        >

                            {comment.content}

                        </div>

                    )

                )

            }






            <hr/>





            <div

                style={{

                    color:"#666",

                    fontSize:"14px"

                }}

            >


                <p>

                    Posted:

                    {" "}

                    {

                        formatDate(

                            tweet.tweet_created_at

                        )

                    }

                </p>



                <p>

                    Saved:

                    {" "}

                    {

                        formatDate(

                            tweet.saved_at

                        )

                    }

                </p>



            </div>





        </div>

    );

}