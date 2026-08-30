import { useState } from "react";
import type { Media } from "../types/tweet";
import ImageViewer from "./ImageViewer";


interface Props {
    media: Media;
}


export default function MediaPreview({ media }: Props) {

    const [hidden, setHidden] = useState(
        media.spoiler
    );

    const [viewer, setViewer] = useState(false);


    const imageUrl =
        `http://127.0.0.1:8000/${media.file_path}`;


    return (
        <>

            <div
                onClick={() => {

                    if(hidden){
                        setHidden(false);
                    }
                    else{
                        setViewer(true);
                    }

                }}

                style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    overflow: "hidden",
                    borderRadius: "12px",
                    cursor: "pointer",
                    position: "relative"
                }}
            >

                <img
                    src={imageUrl}
                    alt={media.filename}

                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",

                        filter: hidden
                            ? "blur(18px)"
                            : "none",

                        transform: hidden
                            ? "scale(1.08)"
                            : "scale(1)"
                    }}
                />


                {
                    hidden &&
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems:"center",
                            justifyContent:"center",
                            color:"white",
                            fontSize:"14px",
                            background:
                                "rgba(0,0,0,0.15)"
                        }}
                    >
                        Click to reveal
                    </div>
                }


            </div>


            {
                viewer &&
                <ImageViewer
                    media={media}
                    onClose={() => setViewer(false)}
                />
            }

        </>
    );
}