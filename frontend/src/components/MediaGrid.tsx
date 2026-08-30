import { useState } from "react";

import type { Media } from "../types/tweet";

import MediaPreview from "./MediaPreview";

import ImageViewer from "./ImageViewer";



interface Props {

    media: Media[];

}



export default function MediaGrid({

    media

}: Props) {


    const [viewer,setViewer] = useState(false);

    const [index,setIndex] = useState(0);



    if(!media || media.length === 0){

        return null;

    }



    function openViewer(i:number){

        setIndex(i);

        setViewer(true);

    }



    function renderMedia(

        item:Media,

        i:number

    ){

        return (

            <MediaPreview

                key={item.id}

                media={item}

                onClick={()=>{

                    openViewer(i);

                }}

            />

        );

    }



    let content;



    // 1张

    if(media.length === 1){


        content=(

            <div

                style={{

                    aspectRatio:"16 / 9"

                }}

            >

                {

                    renderMedia(

                        media[0],

                        0

                    )

                }

            </div>

        );


    }



    // 2张

    else if(media.length === 2){


        content=(

            <div

                style={{

                    display:"grid",

                    gridTemplateColumns:

                        "1fr 1fr",

                    gap:"8px"

                }}

            >

                {

                    media.map(

                        (item,i)=>

                            renderMedia(

                                item,

                                i

                            )

                    )

                }


            </div>

        );


    }



    // 3张

    else if(media.length === 3){


        content=(

            <div

                style={{

                    display:"grid",

                    gridTemplateColumns:

                        "1fr 1fr",

                    gap:"8px"

                }}

            >


                {/* 左侧大图 */}

                <div>

                    {

                        renderMedia(

                            media[0],

                            0

                        )

                    }

                </div>



                {/* 右侧两张 */}

                <div

                    style={{

                        display:"grid",

                        gridTemplateRows:

                            "1fr 1fr",

                        gap:"8px"

                    }}

                >


                    <div

                        style={{

                            aspectRatio:

                                "16 / 9"

                        }}

                    >

                        {

                            renderMedia(

                                media[1],

                                1

                            )

                        }

                    </div>



                    <div

                        style={{

                            aspectRatio:

                                "16 / 9"

                        }}

                    >

                        {

                            renderMedia(

                                media[2],

                                2

                            )

                        }

                    </div>


                </div>


            </div>

        );


    }



    // 4张

    else {


        content=(

            <div

                style={{

                    display:"grid",

                    gridTemplateColumns:

                        "1fr 1fr",

                    gap:"8px"

                }}

            >

                {

                    media

                    .slice(0,4)

                    .map(

                        (item,i)=>

                            renderMedia(

                                item,

                                i

                            )

                    )

                }

            </div>

        );


    }




    return (

        <>


            {content}



            {

                viewer &&


                <ImageViewer

                    media={media}

                    index={index}

                    onClose={()=>{

                        setViewer(false)

                    }}

                    onChange={setIndex}

                />

            }


        </>

    );

}