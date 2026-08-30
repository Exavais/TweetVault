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

    author:string;

    content:string;

    tweet_created_at:string|null;

    saved_at:string;

    media: Media[];
}