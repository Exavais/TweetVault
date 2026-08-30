import { useEffect } from "react";
import type { Media } from "../types/tweet";


interface Props {

    media: Media[];

    index: number;

    onClose: () => void;

    onChange: (index: number) => void;

}


export default function ImageViewer({
    media,
    index,
    onClose,
    onChange
}: Props) {


    const current = media[index];


    const imageUrl =
        `http://127.0.0.1:8000/${current.file_path}`;



    useEffect(() => {

        const handler = (
            e: KeyboardEvent
        ) => {

            if (e.key === "Escape") {
                onClose();
            }


            if (e.key === "ArrowLeft") {

                if (index > 0) {
                    onChange(index - 1);
                }

            }


            if (e.key === "ArrowRight") {

                if (index < media.length - 1) {
                    onChange(index + 1);
                }

            }

        };


        window.addEventListener(
            "keydown",
            handler
        );


        return () => {

            window.removeEventListener(
                "keydown",
                handler
            );

        };


    }, [
        index,
        media.length
    ]);



    return (

        <div

            onClick={onClose}

            style={{
                position:"fixed",
                inset:0,
                background:"rgba(0,0,0,0.85)",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                zIndex:9999
            }}

        >


            {
                index > 0 &&
                <button

                    onClick={(e)=>{

                        e.stopPropagation();

                        onChange(index - 1);

                    }}

                    style={{
                        position:"fixed",
                        left:"30px",
                        fontSize:"40px",
                        color:"white",
                        background:"transparent",
                        border:"none",
                        cursor:"pointer"
                    }}

                >
                    ‹
                </button>
            }



            <img

                src={imageUrl}

                alt={current.filename}

                onClick={
                    e => e.stopPropagation()
                }

                style={{
                    maxWidth:"90%",
                    maxHeight:"90%",
                    objectFit:"contain"
                }}

            />



            {
                index < media.length - 1 &&
                <button

                    onClick={(e)=>{

                        e.stopPropagation();

                        onChange(index + 1);

                    }}

                    style={{
                        position:"fixed",
                        right:"30px",
                        fontSize:"40px",
                        color:"white",
                        background:"transparent",
                        border:"none",
                        cursor:"pointer"
                    }}

                >
                    ›
                </button>
            }



            <button

                onClick={(e)=>{

                    e.stopPropagation();

                    onClose();

                }}

                style={{
                    position:"fixed",
                    top:"20px",
                    right:"20px",
                    fontSize:"28px",
                    color:"white",
                    background:"transparent",
                    border:"none",
                    cursor:"pointer"
                }}

            >
                ✕
            </button>


        </div>

    );

}