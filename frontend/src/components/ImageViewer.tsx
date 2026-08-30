import {
    useEffect,
    useRef,
    useState
} from "react";

import type { Media } from "../types/tweet";


interface Props {

    media: Media[];

    index: number;

    onClose: () => void;

    onChange: (index:number)=>void;

}



export default function ImageViewer({

    media,

    index,

    onClose,

    onChange

}:Props){


    const current = media[index];


    const imageUrl =
        `http://127.0.0.1:8000/${current.file_path}`;



    const [scale,setScale] =
        useState(1);


    const [position,setPosition] =
        useState({

            x:0,

            y:0

        });



    const [dragging,setDragging] =
        useState(false);



    const dragStart =
        useRef({

            x:0,

            y:0,

            originX:0,

            originY:0

        });




    const containerRef =
        useRef<HTMLDivElement>(null);





    useEffect(()=>{


        function keyHandler(
            e:KeyboardEvent
        ){

            if(e.key==="Escape"){

                onClose();

            }


            if(e.key==="ArrowLeft"){

                if(index>0){

                    onChange(index-1);

                    reset();

                }

            }


            if(e.key==="ArrowRight"){

                if(index < media.length-1){

                    onChange(index+1);

                    reset();

                }

            }

        }



        window.addEventListener(
            "keydown",
            keyHandler
        );


        return()=>{

            window.removeEventListener(
                "keydown",
                keyHandler
            );

        };


    },[index]);





    function reset(){

        setScale(1);

        setPosition({

            x:0,

            y:0

        });

    }






    function handleWheel(
        e:React.WheelEvent
    ){

        e.preventDefault();

        e.stopPropagation();



        const delta =
            e.deltaY < 0
            ?
            0.1
            :
            -0.1;



        setScale(
            s=>
                Math.min(
                    Math.max(
                        s+delta,
                        1
                    ),
                    5
                )
        );

    }







    function handlePointerDown(
        e:React.PointerEvent
    ){

        if(scale===1){

            return;

        }



        e.currentTarget.setPointerCapture(
            e.pointerId
        );



        setDragging(true);



        dragStart.current={

            x:e.clientX,

            y:e.clientY,

            originX:position.x,

            originY:position.y

        };

    }







    function handlePointerMove(
        e:React.PointerEvent
    ){

        if(!dragging){

            return;

        }



        setPosition({

            x:

                dragStart.current.originX

                +

                (

                    e.clientX

                    -

                    dragStart.current.x

                ),



            y:

                dragStart.current.originY

                +

                (

                    e.clientY

                    -

                    dragStart.current.y

                )

        });

    }







    function handlePointerUp(){

        setDragging(false);

    }







    return (

        <div


            ref={containerRef}


            onClick={onClose}


            style={{

                position:"fixed",

                inset:0,

                background:
                    "rgba(0,0,0,0.85)",

                display:"flex",

                justifyContent:"center",

                alignItems:"center",

                zIndex:9999,

                overflow:"hidden"

            }}

        >




            <div

                style={{

                    position:"fixed",

                    top:"20px",

                    left:"50%",

                    transform:
                        "translateX(-50%)",

                    color:"white"

                }}

            >

                {index+1} / {media.length}

            </div>





            <img


                src={imageUrl}


                draggable={false}


                onClick={

                    e=>

                        e.stopPropagation()

                }



                onWheel={handleWheel}



                onPointerDown={
                    handlePointerDown
                }



                onPointerMove={
                    handlePointerMove
                }



                onPointerUp={
                    handlePointerUp
                }



                onDoubleClick={()=>{


                    if(scale===1){

                        setScale(2);

                    }
                    else{

                        reset();

                    }

                }}



                style={{


                    maxWidth:"90%",


                    maxHeight:"90%",


                    objectFit:"contain",



                    userSelect:"none",



                    touchAction:"none",



                    cursor:

                        scale>1

                        ?

                            dragging

                            ?

                            "grabbing"

                            :

                            "grab"

                        :

                        "default",



                    transform:

                        `translate(${position.x}px,${position.y}px) scale(${scale})`,



                    transition:

                        dragging

                        ?

                        "none"

                        :

                        "transform .2s"

                }}

            />





            {
                index>0 &&

                <button

                    onClick={

                        e=>{

                            e.stopPropagation();

                            onChange(index-1);

                            reset();

                        }

                    }


                    style={{

                        position:"fixed",

                        left:"30px",

                        fontSize:"40px",

                        color:"white",

                        background:"transparent",

                        border:"none"

                    }}

                >

                    ‹

                </button>

            }






            {
                index < media.length-1 &&

                <button

                    onClick={

                        e=>{

                            e.stopPropagation();

                            onChange(index+1);

                            reset();

                        }

                    }


                    style={{

                        position:"fixed",

                        right:"30px",

                        fontSize:"40px",

                        color:"white",

                        background:"transparent",

                        border:"none"

                    }}

                >

                    ›

                </button>

            }






            <button

                onClick={

                    e=>{

                        e.stopPropagation();

                        onClose();

                    }

                }


                style={{

                    position:"fixed",

                    top:"20px",

                    right:"20px",

                    fontSize:"28px",

                    color:"white",

                    background:"transparent",

                    border:"none"

                }}

            >

                ✕

            </button>


        </div>

    );

}