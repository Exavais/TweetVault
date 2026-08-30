import os
import uuid
from pathlib import Path


MEDIA_DIR = Path("storage/media")


MEDIA_DIR.mkdir(
    parents=True,
    exist_ok=True
)


def save_file(file):

    suffix = Path(
        file.filename
    ).suffix

    filename = (
        f"{uuid.uuid4()}{suffix}"
    )

    path = MEDIA_DIR / filename


    with open(
        path,
        "wb"
    ) as buffer:

        buffer.write(
            file.file.read()
        )


    return str(path)