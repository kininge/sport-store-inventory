# Sport Store Inventory Management System

Micro-services based inventory management web application 

---

## Screenshots

### Inventory List
(TODO)

### Add Inventory
(TODO)

---

## Tech Stack

### Backend
- Golang
- Gin
- gRPC
- GORM

### Frontend
- Next.js
- TailwindCSS

### Database
- PostgreSQL

---

## Project Structure

```ASCII
sport-store-inventory/
│
├── backend/
│   ├── cmd/
│   │   └── server/
│   │       └── main.go
│   │
│   ├── internal/
│   │   ├── handlers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── db/
│   │   └── search/
│   │
│   ├── proto/
│   │
│   ├── go.mod
|   │
|   ├── .gitignore
|   │
│   └── .env
│
├── frontend/
|   │
|   ├── .gitignore
|   │
│   └── .env
│
├── docs/
│
├── docker-compose.yml
│
└── README.md
```

---

## Architecture

```ASCII
Frontend (Next.js)
      |
 REST API
      |
Go Gateway
      |
    gRPC
      |
Inventory Service
      |
 PostgreSQL
```

---

## Project Setup Instructions

```
```

---

## Features Checklist

---

## Development Plan and Progress

### DAY 1 — Understand Go + Build CRUD

#### Goal:
  - become comfortable with Go syntax
  - create working backend

#### Go concepts to lean:
  - [x] structs
  - [x] methods
  - [] interfaces (basic)
  - [] goroutines
  - [] channels (basic only)
  - [x] Gin framework
  - [x] database/sql OR GORM
  - [] context.Context
  - [x] error handling

#### Deliverables
  - [x] Plan the project (22 May 10:00 PM)
  - [x] create repo (23 May - 7:00 AM)
  - [x] install Go (23 May - 8:00 PM)
  - [x] setup PostgreSQL (24 May - 12:12 PM)
  - [x] schema design
  - [x] learn and setup backend

#### Note 

> Intial target is working busines logic with REST. gRPC wrap will later
  
---

### DAY 2 — Search + Async + Excel

#### Goal:
  - learn inverted index
  - complete working backend

#### Go concepts to lean:
  - [] inverted index search
  - [] Excel export

#### Deliverables
  - [] complete tokenized search
  - [] Async Add/Update
  - [] excel generation

#### Note 

> Trie based Elasticsearch-level engineering is not required. simple in-memory inverted indexing also work.

---

### DAY 3 — gRPC

#### Goal:
  - learn gRPC
  - gRPC wrap to backend
    ```ASCII
        Client UI
           |
        HTTP REST
           |
        Gateway
           |
        gRPC
           |
        Inventory Service
    ```

#### Concepts to lean:
  - [] protobuf basics
  - [] service definitions
  - [] request/response messages

#### Deliverables
  - [] ready with getaway
  - [] gRPC layer

#### Note 

> Need to demonstrate can I use gRPC correctly? , advanced protobuf mastery streaming, distributed architecture not needed

---

### DAY 4 — UI

#### Goal:
  - complete working web app
  - good UX

#### Deliverables
  - [] Admin Dashboard
    - [] inventory list
    - [] add inventory
    - [] edit inventory
    - [] search
    - [] export button
  - [] Tailwind bas=ised clean UI

#### Note 

> Working product first priority, don't flow in beautiful UI (important self note)

---

### DAY 5 — Polish

#### Goal:
  - index on DB
  - Logging
  - Seed Data

#### Deliverables
  - [] Indexes on DB for features
  - [] logging for backend
  - [] Error boundry for frontned
  - [] add seed data for intialiazation

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👨‍💻 Author & Maintainer

**Pritam Kininge** — Problem Solver 
🗓️ Submitted: May 23, 2026  
[LinkedIn](https://linkedin.com/in/pritam-kininge)  |  [GitHub](https://github.com/kininge)  |  [Leetcode](https://leetcode.com/u/kininge007/)




