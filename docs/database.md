# TweetVault Database Design


## 1. Overview

TweetVault uses PostgreSQL as the primary database.

The database stores:

- Tweet metadata
- Author information
- Media metadata
- Tags
- Comments
- Modification history

Media files themselves are stored separately in filesystem.


---

# 2. Entity Relationship

```

Author

|

| 1:N

|

Tweet

|

| 1:N

|

Media

Tweet

|

| N:M

|

Tag

Tweet

|

| 1:N

|

Comment

|

| 1:N

|

CommentHistory

```

---

# 3. Tables


## 3.1 Author


Stores information about tweet authors.


| Field | Type | Description |
|-|-|-|
| id | bigint | primary key |
| username | varchar | X username |
| display_name | varchar | display name |
| avatar_url | text | avatar |
| created_at | timestamp | record creation time |
| updated_at | timestamp | last update time |


---

## 3.2 Tweet


Stores archived tweet information.


| Field | Type | Description |
|-|-|-|
| id | bigint | primary key |
| tweet_id | varchar | original X tweet id |
| author_id | bigint | foreign key |
| content | text | tweet text |
| tweet_time | timestamp | original publish time |
| saved_time | timestamp | archive time |
| source_url | text | original URL |


---

## 3.3 Media


Stores media metadata.


| Field | Type | Description |
|-|-|-|
| id | bigint | primary key |
| tweet_id | bigint | foreign key |
| file_path | text | storage path |
| thumbnail_path | text | preview path |
| media_type | varchar | image/video |
| file_size | bigint | bytes |
| hash | varchar | duplicate detection |
| spoiler | boolean | hidden by default |


---

## 3.4 Tag


Stores user-defined tags.


| Field | Type |
|-|-|
| id | bigint |
| name | varchar |
| created_at | timestamp |


---

## 3.5 Tweet_Tag


Many-to-many relationship.


| Field | Type |
|-|-|
| tweet_id | bigint |
| tag_id | bigint |


---

## 3.6 Comment


Stores user annotations.


| Field | Type |
|-|-|
| id | bigint |
| tweet_id | bigint |
| content | text |
| created_at | timestamp |
| updated_at | timestamp |


---

## 3.7 Comment_History


Stores comment modification history.


| Field | Type |
|-|-|
| id | bigint |
| comment_id | bigint |
| content | text |
| created_at | timestamp |


---

# 4. Design Decisions


## 4.1 Media separation

Large binary files are not stored in PostgreSQL.

Only metadata is stored.


Reason:

- Reduce database size
- Easier backup
- Better media management


---

## 4.2 Keep original tweet snapshot

Tweet content may disappear or change.

Therefore archived data stores:

- original text
- author snapshot
- media snapshot


---

## 4.3 Timestamp strategy

All important objects contain:

- created_at
- updated_at


This supports:

- history tracking
- future synchronization

