# TweetVault Architecture Design


## 1. Overview

TweetVault adopts a separated frontend-backend architecture.

The system consists of:

- Frontend
- Backend API
- Database
- Media Storage
- Search System

---

## 2. Overall Architecture

```
                 User

                  |
                  |

             Frontend

          React + TypeScript

                  |

             HTTP API

                  |

              Backend

              FastAPI

        /          |          \

       /           |           \

 PostgreSQL     Storage      Search

 Database       Media       Engine
```

---

## 3. Frontend

Technology:

- React
- TypeScript
- Tailwind CSS

Responsibilities:

- Display tweet-like interface
- Media spoiler interaction
- Archive management
- Search interface
- Timeline visualization

---

## 4. Backend

Technology:

- FastAPI
- SQLAlchemy

Responsibilities:

- Tweet import
- Data processing
- Archive management
- Authentication(optional)
- API service

Main modules:

```
backend/app

├── api
│
├── models
│
├── services
│
├── database
│
└── main.py
```

---

## 5. Database

Database:

PostgreSQL

Stores:

- Tweet metadata
- User information
- Tags
- Comments
- History records

Does not store:

- Original media files

---

## 6. Media Storage

Media files are stored separately from database.

Example:

```
storage/media/

tweet_id/

    original/
        image.jpg

    thumbnail/
        image.webp
```

Database stores:

- file path
- hash
- metadata

---

## 7. Search

Initial version:

PostgreSQL Full Text Search

Future:

Elasticsearch

Search fields:

- tweet text
- author
- tags
- comments

---

8. Deployment

Development:

Local machine

Possible future deployment:

- Backend: VPS
- Database: PostgreSQL
- Storage: Local disk / Object Storage
