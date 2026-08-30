import axios from "axios";


const API =
    "http://127.0.0.1:8000";



export async function getTags(
    archiveId:number
){

    const res =
        await axios.get(
            `${API}/api/archives/${archiveId}/tags`
        );


    return res.data;

}




export async function getComments(
    archiveId:number
){

    const res =
        await axios.get(
            `${API}/api/archives/${archiveId}/comments`
        );


    return res.data;

}