# Sport Store Inventory Frontend

A feature-driven Next.js frontend for the Sport Store Inventory system.

Built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **React Query**, **Axios**, and **Recharts**.

---

![Next.js](https://img.shields.io/badge/framework-Next.js-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/language-TypeScript-007ACC?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/styled%20with-TailwindCSS-38B2AC?logo=tailwindcss)
![React Query](https://img.shields.io/badge/data%20fetching-React%20Query-FF4154?logo=react-query)

---

## ✨ Overview

This frontend delivers a clean inventory dashboard experience with:

- inventory health and stock analytics
- low-stock and top-offer product views
- edit inventory flow
- export integration with backend jobs
- responsive layout and reusable component design

It is optimized for a backend API located at `http://localhost:8080/api/v1` and is architected for fast server-side rendering combined with client-side interactivity.

---

## 🚀 Core Features

- **Dashboard** with inventory health, category distribution, low-stock, and top-offer widgets
- **Editable inventory details** via route `/inventories/[id]/edit`
- **Reusable UI components** for charts, tables, cards, and progress bars
- **Server/client hybrid architecture** using Next.js App Router
- **React Query caching** for faster client navigation
- **Backend export flow** support for generating downloadable Excel reports
- **Responsive UI** built with Tailwind CSS

---

## 🧩 Project Structure

```text
frontend/
├── app/
│   ├── page.tsx
│   └── inventories/[id]/edit/page.tsx
├── components/
│   ├── common/
│   │   ├── bar-chart.tsx
│   │   ├── fill-bar.tsx
│   │   ├── product-record.tsx
│   │   └── ui/
│   ├── dashboard/
│   │   ├── category-chart-card.tsx
│   │   ├── inventroy-health-card.tsx
│   │   └── product-list-card.tsx
│   └── inventory/
│       └── edit-inventory.tsx
├── lib/
│   └── axios.ts
├── providers/
│   └── query-provider.tsx
├── services/
│   ├── dashboard.service.ts
│   └── inventory.service.ts
├── types/
│   └── inventory.ts
├── public/
└── app/
    ├── globals.css
    └── layout.tsx
```

---

## 🏗️ Architecture

This app follows a simple server/client split:

- `app/page.tsx` fetches dashboard data on the server for fast initial render
- `EditInventory` is a client component for interactive form behavior
- `QueryProvider` wraps the app and provides React Query cache
- `axios` centralizes backend API communication

### Route map

- `/` — dashboard with metrics and lists
- `/inventories/[id]/edit` — inventory edit page

### Data flow

```text
Browser
  └─> app/page.tsx (server fetch)
         ├─> getDashboard()
         ├─> getTopOffers()
         ├─> getLowStockItems()
         └─> getCategoryDistribution()
  └─> Inventory edit route loads EditInventory
         └─> optionally uses cached inventory prop or fetches by id
```

---

## 🔌 Backend Integration

The frontend communicates with the backend through `frontend/lib/axios.ts`.

```ts
export const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});
```

### Backend endpoints used

- `GET /api/v1/dashboard`
- `GET /api/v1/dashboard/offer-stock`
- `GET /api/v1/dashboard/low-stock`
- `GET /api/v1/dashboard/category-distribution`
- `GET /api/v1/inventories`
- `GET /api/v1/inventories/:id`
- `PUT /api/v1/inventories/:id`
- `POST /api/v1/inventories/export`
- `GET /api/v1/inventories/export/:id`
- `GET /api/v1/inventories/export/:id/download`

> Update `frontend/lib/axios.ts` when using a different backend host or port.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Backend API running on `http://localhost:8080`

### Install dependencies

```bash
cd frontend
npm install
```

### Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

### Build for production

```bash
npm run build
npm run start
```

---

## 📄 Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

## 🧠 Component Summary

- **`ProductListCard`** — inventory table with action buttons
- **`InventoryHealthCard`** — KPI card with progress bar
- **`CategoryChartCard`** — category distribution visualization
- **`EditInventory`** — inventory edit form and save logic
- **`BarChart`** — chart visual component with tooltip behavior
- **`FillBar`** — progress indicator for inventory health

---

## ✅ UX / Feature Highlights

- Dashboard view driven by backend metrics
- Low stock products and top offer views for quick insights
- Inventory edit route with fallback fetch behavior
- Backend export job integration for Excel download
- Responsive layout for desktop and mobile

---

## 📈 Production Notes

- Keep API endpoint configuration externalized
- Run `npm run build` before deploying
- Use a Node process manager in production (PM2, systemd, Docker)
- Add better error handling / toast notifications for a production-ready UX
- Consider adding unit/integration tests for stability

---
