export interface User {

    id:number;

    twitter_id:string;

    username:string;

    display_name:string | null;

    avatar_path:string | null;

}



export interface Media {

    id:number;

    filename:string;

    file_path:string;

    media_type:string;

    size:number;

    spoiler:boolean;

}



export interface Tweet {


    id:number;


    url:string;


    user:User;


    content:string;


    tweet_created_at:string | null;


    saved_at:string;


    media:Media[];

}