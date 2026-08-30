import { useState } from "react";

import type { Media } from "../types/tweet";


interface Props {

    media: Media;

    onClick: () => void;

}



export default function MediaPreview({

    media,

    onClick

}: Props) {


    const [hidden, setHidden] = useState(
        media.spoiler
    );


    const imageUrl =
        `http://127.0.0.1:8000/${media.file_path}`;



    function handleClick(){

        if(hidden){

            // 第一次点击：取消 spoiler

            setHidden(false);

        }
        else{

            // 第二次点击：查看原图

            onClick();

        }

    }



    return (

        <div

            onClick={handleClick}

            style={{

                width:"100%",

                height:"100%",

                overflow:"hidden",

                borderRadius:"12px",

                cursor:"pointer",

                position:"relative"

            }}

        >

            <img

                src={imageUrl}

                alt={media.filename}

                style={{

                    width:"100%",

                    height:"100%",

                    objectFit:"cover",

                    filter: hidden
                        ?
                        "blur(18px)"
                        :
                        "none",

                    transform: hidden
                        ?
                        "scale(1.08)"
                        :
                        "scale(1)"

                }}

            />



            {
                hidden &&

                <div

                    style={{

                        position:"absolute",

                        inset:0,

                        display:"flex",

                        alignItems:"center",

                        justifyContent:"center",

                        color:"white",

                        background:
                            "rgba(0,0,0,0.15)",

                        fontSize:"14px"

                    }}

                >

                    Click to reveal

                </div>

            }



            {
                !hidden &&

                <button

                    onClick={(e)=>{

                        e.stopPropagation();

                        setHidden(true);

                    }}

                    style={{

                        position:"absolute",

                        right:"8px",

                        top:"8px",

                        background:
                            "rgba(0,0,0,0.5)",

                        color:"white",

                        border:"none",

                        borderRadius:"8px",

                        padding:"4px 8px",

                        cursor:"pointer",

                        zIndex:2

                    }}

                >

                    Hide

                </button>

            }


        </div>

    );

}