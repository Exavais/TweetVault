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


    return (

        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.85)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999
            }}

            onClick={onClose}
        >

            <img
                src={imageUrl}
                alt={media.filename}

                onClick={
                    (e) => {
                        e.stopPropagation();
                    }
                }

                style={{
                    maxWidth:"90%",
                    maxHeight:"90%",
                    objectFit:"contain",
                    cursor:"zoom-out"
                }}
            />


        </div>

    );
}