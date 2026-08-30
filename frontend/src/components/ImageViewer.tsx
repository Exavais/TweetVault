import { useEffect } from "react";
import type { Media } from "../types/tweet";


interface Props {

    media: Media;

    onClose: () => void;

}


export default function ImageViewer({
    media,
    onClose
}: Props) {


    const imageUrl =
        `http://127.0.0.1:8000/${media.file_path}`;


    useEffect(() => {

        const handleKeyDown = (
            event: KeyboardEvent
        ) => {

            if (event.key === "Escape") {
                onClose();
            }

        };


        window.addEventListener(
            "keydown",
            handleKeyDown
        );


        return () => {

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

        };

    }, [onClose]);


    return (

        <div
            onClick={onClose}

            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.85)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999
            }}
        >

            {/* 关闭按钮 */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}

                style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    fontSize: "28px",
                    color: "white",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    zIndex: 10000
                }}
            >
                ✕
            </button>


            <img
                src={imageUrl}
                alt={media.filename}

                onClick={
                    e => e.stopPropagation()
                }

                style={{
                    maxWidth: "90%",
                    maxHeight: "90%",
                    objectFit: "contain",
                    cursor: "zoom-out"
                }}
            />


        </div>

    );
}