import type { Media } from "../types/tweet";
import MediaPreview from "./MediaPreview";


interface Props {

    media: Media[];

}


export default function MediaGrid({
    media
}: Props) {


    if (!media || media.length === 0) {
        return null;
    }



    if (media.length === 1) {

        return (

            <MediaPreview

                media={media[0]}

                allMedia={media}

            />

        );

    }



    if (media.length === 3) {

        return (

            <div
                style={{
                    display:"grid",
                    gridTemplateColumns:"2fr 1fr",
                    gridTemplateRows:"1fr 1fr",
                    gap:"8px"
                }}
            >

                <div
                    style={{
                        gridRow:"1 / 3"
                    }}
                >

                    <MediaPreview

                        media={media[0]}

                        allMedia={media}

                    />

                </div>



                <MediaPreview

                    media={media[1]}

                    allMedia={media}

                />



                <MediaPreview

                    media={media[2]}

                    allMedia={media}

                />


            </div>

        );

    }



    return (

        <div

            style={{
                display:"grid",
                gridTemplateColumns:"repeat(2,1fr)",
                gap:"8px"
            }}

        >

            {
                media
                    .slice(0,4)
                    .map(item => (

                        <MediaPreview

                            key={item.id}

                            media={item}

                            allMedia={media}

                        />

                    ))
            }

        </div>

    );

}