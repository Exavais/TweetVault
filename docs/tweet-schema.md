# Tweet Archive Schema


## Archive Item

An archived item represents a saved social media content.


```json
{
  "id": "local_archive_id",

  "source": {
    "platform": "x",
    "url": "https://x.com/user/status/123456",
    "original_id": "123456"
  },


  "author": {
    "id": "author_id",
    "username": "example",
    "display_name": "Example User",
    "avatar_url": ""
  },


  "content": {
    "text": "Tweet content",
    "language": "en"
  },


  "time": {
    "published_at": "2026-08-31T00:00:00",
    "archived_at": "2026-08-31T01:00:00"
  },


  "media": [
    {
      "id": "media_001",
      "type": "image",

      "source_url": "",

      "storage": {
        "original_path": "",
        "thumbnail_path": ""
      },

      "metadata": {
        "width": 1920,
        "height": 1080,
        "size": 1024000
      },

      "display": {
        "spoiler": true,
        "revealed": false
      }
    }
  ],


  "interaction": {
    "reply_count": 10,
    "like_count": 100,
    "repost_count": 20
  },


  "annotation": {

    "tags": [
      "AI",
      "Research"
    ],

    "comment": "My personal note",

    "history": [
      {
        "time": "2026-08-31",
        "content": "Initial note"
      }
    ]
  }
}