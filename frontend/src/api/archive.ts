import axios from "axios";


const API =
    "http://127.0.0.1:8000";



export async function getArchive(
    id:number
){

    const response =
        await axios.get(
            `${API}/api/archives/${id}`
        );


    return response.data;

}