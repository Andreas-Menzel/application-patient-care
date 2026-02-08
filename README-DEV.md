# Dev-README - Architecture and Tech-Stack

This README file is aimed at developers of this application and should give a
basic overview over the structure of the app and the used tech stack.

This file does **not** include specific information on how to build and deploy
the app (see `README-DEPLOY.md`). It should just give a basic, high-level
overview over the project.

The patient management app is set up as a monorepo, which is split up into
three main sections:

## Backend

The `/backend` folder holds the code, setup and configuration files and
database (`backend/data/`), exclusively used by the backend server.

### Tech Stack

- **TypeScript** for type safety
- **Zod** for type safety
- **Express** for the api route handlers
- **Drizzle ORM** for database access (sqlite3 for now)
- **@ts-rest/express** for type-safe API routing
- **@ts-rest/open-api** for OpenAPI spec generation
- **Swagger UI** for api documentation and testing
  (accessible under `<url>/api-docs`)

## Frontend

The `/frontend` folder holds the code, that is solely used by the frontend.
Including pages, modals, images, icons, etc.

### Tech Stack

- **TypeScript** for type safety
- **Zod** for type safety
- **Vue.js** for SPA (routing is also managed by the Vue Router)
- **TailwindCSS** for css styling
- **Vite** as the project bundler
- **@ts-rest/vue-query** for type-safe API client
- **TanStack Vue Query** for data fetching and caching

## Shared

Certain information is shared between the frontend and the backend.
This includes:

- `shared/src/contracts`: API contracts, so client and server use the same api
  definitions
- `shared/src/schemas`: Schemas for common data that is used in the backend,
  returned by the api and/or send from the client to the server

### Tech Stack

- **TypeScript** for type safety
- **Zod** for type safety
- **@ts-rest/core** for API contract definitions
- **libphonenumber-js** for phone number validation

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

This starts all three workspaces (shared, backend, frontend) concurrently.
The frontend is available at `http://localhost:5173` and proxies API requests
to the backend at `http://localhost:3000`.
