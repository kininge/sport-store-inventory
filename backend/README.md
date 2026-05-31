# Sport Store Inventory Backend

A production-grade Go backend for the Sport Store Inventory system.

This service provides inventory, category, dashboard, and export APIs. It is built with **Go**, **Gin**, **GORM**, **PostgreSQL**, and an asynchronous Excel export worker.

---

![Go](https://img.shields.io/badge/language-Go-00ADD8?logo=go)
![Gin](https://img.shields.io/badge/framework-Gin-000000)
![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-336791?logo=postgresql)
![GORM](https://img.shields.io/badge/orm-GORM-8C1515)
![Excelize](https://img.shields.io/badge/export-Excelize-2F74B5)

---

## Overview

This backend is designed to power the Sport Store Inventory frontend with a clean REST API, dashboard analytics, inventory management, and a background export process.

It focuses on:

- **API-first design** for inventory and category management
- **Server-side analytics** for dashboard metrics
- **Asynchronous export processing** for Excel generation
- **Simple deployability** with environment-driven configuration

---

## Core Features

- Inventory CRUD and category management endpoints
- Search, pagination, filtering, and sorting support for inventories
- Dashboard endpoints for health score, stock status, and category distribution
- Asynchronous Excel export jobs with downloadable results
- PostgreSQL schema with full-text search support
- Healthcheck and versioned API routing

---

## Tech Stack

- **Go 1.26.3**
- **Gin** web framework
- **GORM** ORM with PostgreSQL driver
- **PostgreSQL** database
- **excelize** for Excel export generation
- **godotenv** for local environment loading

---

## Directory Structure

```text
backend/
├── cmd/server/main.go
├── go.mod
├── scripts/
│   ├── schema.sql
│   └── seed.sql
├── internals/
│   ├── database/
│   │   └── database.go
│   ├── handlers/
│   │   ├── category.go
│   │   ├── dashboard.go
│   │   ├── export_async.go
│   │   ├── health.go
│   │   └── inventory.go
│   ├── models/
│   │   ├── category.go
│   │   └── inventory.go
│   ├── routes/routes.go
│   └── workers/export_worker.go
```

---

## Environment Variables

Create a `.env` file in the `backend/` folder with the following values:

```env
PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_USER=<!-- user username -->
DB_NAME=sport_store_inventory
DB_SSLMODE=disable
```

---

## Database Setup

This repository includes SQL scripts for schema creation and sample data seeding.

- [backend/scripts/schema.sql](./scripts/schema.sql) — creates `categories` and `inventories`, search index, and trigger.
- [backend/scripts/seed.sql](./scripts/seed.sql) — inserts sample categories and inventory items.

Run the scripts before starting the server:

```bash
cd backend
psql "host=$DB_HOST port=$DB_PORT user=$DB_USER dbname=$DB_NAME sslmode=$DB_SSLMODE" -f scripts/schema.sql
psql "host=$DB_HOST port=$DB_PORT user=$DB_USER dbname=$DB_NAME sslmode=$DB_SSLMODE" -f scripts/seed.sql
```

---

## Local Development

```bash
cd backend
go run ./cmd/server
```

The server will read `.env` and start on the configured `PORT`.

---

## Production Build

```bash
cd backend
go build -o sport-store-inventory ./cmd/server
./sport-store-inventory
```

---

## Architecture Diagram

```text
+---------+       HTTP        +---------+        SQL         +------------+
| Frontend| --------------->  | Backend | --------------->  | PostgreSQL |
+---------+                  +---------+                  +------------+
       |                          |                            |
       |                          |                            |
       |  <-- export requests --- |                            |
       |                          |                            |
       |                          | --> enqueue job ---------> |
       |                          |                            |
       |                          | <-- job status poll -------|
       |                          |                            |
       |                          | --> download file -------->|
       |                          |                            |
```

---

## API Endpoints

### Health

- `GET /api/v1/health`

### Categories

- `GET /api/v1/categories`
- `GET /api/v1/categories/:id`
- `POST /api/v1/categories`
- `PUT /api/v1/categories/:id`
- `DELETE /api/v1/categories/:id`

### Inventories

- `GET /api/v1/inventories`
- `GET /api/v1/inventories/:id`
- `POST /api/v1/inventories`
- `PUT /api/v1/inventories/:id`
- `DELETE /api/v1/inventories/:id`

Supported query parameters for `GET /api/v1/inventories`:

- `page` (default `1`)
- `limit` (default `10`)
- `search`
- `category_id`
- `sort` (`price`, `quantity`, `created_at`, `name`)
- `order` (`asc`, `desc`)

### Dashboard

- `GET /api/v1/dashboard`
- `GET /api/v1/dashboard/offer-stock`
- `GET /api/v1/dashboard/low-stock`
- `GET /api/v1/dashboard/category-distribution`

### Export Jobs

- `POST /api/v1/inventories/export` — enqueue an export job
- `GET /api/v1/inventories/export/:id` — check job status
- `GET /api/v1/inventories/export/:id/download` — download generated Excel file

---

## Feature Workflows

### Export Excel Workflow

```text
Client          Backend API         Worker          File System
  |                |                 |                  |
  | POST /export   |                 |                  |
  |--------------->|                 |                  |
  |                | create job id   |                  |
  |                | enqueue job     |                  |
  |                |---------------> |                  |
  |                |                 | process export   |
  |                |                 |----------------->|
  |                |                 | save xlsx file   |
  |                |                 |                  |
  |                |                 | job status = done|
  |                |                 |<-----------------|
  |                |                 |                  |
  | GET /export/:id|                 |                  |
  |<---------------|                 |                  |
  |                | return status   |                  |
  | GET /download  |                 |                  |
  |<---------------|                 |                  |
```

- Export requests are enqueued, processed asynchronously, and written to disk.
- Status is stored in-memory in `workers.ExportJobs`.
- Download is only available once the job state is `completed`.

### Dashboard / Analytics Workflow

```text
Client  -->  GET /api/v1/dashboard                   --> SQL aggregate queries
Client  -->  GET /api/v1/dashboard/offer-stock       --> top offers query
Client  -->  GET /api/v1/dashboard/low-stock         --> low stock query
Client  -->  GET /api/v1/dashboard/category-distribution --> category counts
```

- Aggregation logic runs in the backend for performance and one API response.
- Category distribution, low stock, and offer data are returned as concise JSON payloads.

---

## Data Model

### Database Structure

```text
+-----------------+        +------------------+
|   categories    |        |    inventories   |
+-----------------+        +------------------+
| id (PK)         |<-------| id (PK)          |
| name            |        | name             |
| created_at      |        | brand            |
| updated_at      |        | product_model    |
| deleted_at      |        | description      |
+-----------------+        | price            |
                           | offer            |
                           | quantity         |
                           | category_id (FK) |
                           | created_at       |
                           | updated_at       |
                           | deleted_at       |
                           +------------------+
```

### Inventory

Fields:

- `Name` (string)
- `Brand` (string)
- `ProductModel` (string)
- `Description` (string)
- `Price` (float)
- `Offer` (int)
- `Quantity` (int)
- `CategoryID` (uint)
- `Category` (object)

### Category

Fields:

- `Name` (string)

---

## Implementation Notes

- The application uses `gorm.Model` for timestamps and soft delete fields.
- Inventory search uses a PostgreSQL full-text search trigger.
- Export jobs are processed in a background goroutine with in-memory job tracking.
- CORS is configured to allow the frontend origin `http://localhost:3000`.

---

## Limitations

- Export jobs are stored in memory; restart loses job state.
- No authentication or authorization is implemented.
- No database migration tool is included.
- No automated test suite is currently available.

---

## Production Considerations

- Use a process manager such as `systemd`, `supervisord`, or Kubernetes.
- Consider a persistent queue (RabbitMQ, Redis streams) instead of in-memory job state.
- Add database migration tooling (e.g. `golang-migrate`).
- Enable `DB_SSLMODE=require` for secure DB connections.
- Store export files in durable storage, not local disk, for production.
- Add monitoring, metrics, and structured logging.

---

## Troubleshooting

- `Failed to connect to database` — confirm `.env` values and PostgreSQL access.
- `Invalid inventory ID` — verify route parameter is a number.
- `Export job not found` — job state is not persisted across server restart.
- `HTTP 404` on API routes — ensure URL prefix is `/api/v1`.

---
