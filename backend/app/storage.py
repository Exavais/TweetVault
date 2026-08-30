import os

from fastapi import UploadFile



BASE_DIR = "storage"



MEDIA_DIR = os.path.join(
    BASE_DIR,
    "media"
)



AVATAR_DIR = os.path.join(
    BASE_DIR,
    "avatars"
)



os.makedirs(
    MEDIA_DIR,
    exist_ok=True
)


os.makedirs(
    AVATAR_DIR,
    exist_ok=True
)




def save_file(
    file: UploadFile
):

    path = os.path.join(

        MEDIA_DIR,

        file.filename

    )


    with open(
        path,
        "wb"
    ) as buffer:

        buffer.write(
            file.file.read()
        )


    return path





def save_avatar(
    file: UploadFile,
    user_id:int
):

    ext = ""

    if "." in file.filename:

        ext = "." + file.filename.split(".")[-1]


    filename = (
        f"user_{user_id}{ext}"
    )


    path = os.path.join(

        AVATAR_DIR,

        filename

    )


    with open(
        path,
        "wb"
    ) as buffer:

        buffer.write(
            file.file.read()
        )


    return path