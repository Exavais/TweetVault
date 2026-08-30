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




    const [
        tweet,
        setTweet
    ] = useState<Tweet | null>(null);




    const [
        tags,
        setTags
    ] = useState<any[]>([]);




    const [
        comments,
        setComments
    ] = useState<any[]>([]);






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

                width:"100%",

                maxWidth:"800px",

                margin:"auto",

                padding:"20px",

                boxSizing:"border-box",

                textAlign:"left"

            }}

        >





            {/* Header */}

            <div

                style={{

                    display:"flex",

                    justifyContent:"space-between",

                    alignItems:"flex-start",

                    marginBottom:"20px"

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

                                width:"56px",

                                height:"56px",

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



                        <h2

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

                        </h2>




                        <div

                            style={{

                                color:"#666",

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

                        marginTop:"6px",

                        whiteSpace:"nowrap"

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

                    style={{

                        marginTop:"20px"

                    }}

                >

                    <MediaGrid

                        media={tweet.media}

                    />

                </div>

            }



            {
                tweet.saved_at &&

                <div

                    style={{

                        marginTop:"20px",

                        color:"#666",

                        fontSize:"13px",

                        textAlign:"left"

                    }}

                >

                    Saved at:

                    {" "}

                    {

                        formatDate(

                            tweet.saved_at

                        )

                    }

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

                                marginBottom:"10px",

                                textAlign:"left"

                            }}

                        >

                            {comment.content}

                        </div>

                    )

                )

            }





        </div>

    );

}