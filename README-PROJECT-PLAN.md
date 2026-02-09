# Project Plan

## High Level Plan

[x] 1. Setup main project structure
[x] 2. Setup frontend with Vue.js, etc.
[x] 3. Setup backend with node, express, etc.
[x] 4. Create required classes/types/etc. for patients
[x] 5. Create basic api endpoints (GET, POST, PUT, DELETE)
[x] 6. Add basic pages to add/view/update patient data
[x] 7. Setup docker
[x] 8. Setup Caddy for HTTPS

## Detailed Plan

### 1. Setup main project structure

Mainly done by Webstorm: `package.json`, `package-lock.json`, `tsconfig.json`,
`src/`, etc.

Published to Github via `gh repo create application-patient-care --private --source=. --remote=origin --push`

### 2. Setup frontend with Vue.js, etc.

Make sure that the frontend can be served by `npm run dev` and loads a basic
Vue SPA.

```bash
# ...
npm create vite@latest frontend -- --template vue-ts
# ...
```

### 3. Setup backend with node, express, etc

- Setup basic middleware
- Serve basic /ping route
- Serve Vue SPA ("catchall" - Vue router will handle the routes later)

### 4. Create required classes/types/etc. for patients

Setup `shared/` folder for shared types.

~Define patient data as TS types and/or interfaces~

Use Zod to specify the exact types of patients. Zod also does run-time checks
(not only compile-time).

### 5. Create basic api endpoints (GET, POST, PUT, DELETE)

We *need* a swagger ui => good interactive documentation
(ideal for development).

Define contracts for the api => can be used in the frontend to get functions
like `api.getAllPatients()` and the backend to help defining the routes and
route handlers.

### 6. Add basic pages to add/view/update patient data

1. Create layout/styling and show hardcoded mock data
2. Add Vue Router to show correct pages
3. Use ts-rest/vue to fetch data from the backend

### 7. Setup docker

Basic Docker setup.

Also add a deploy script to pull the changes on the server, rebuild the
container, stop the old container and start the new one.

### 8. Setup Caddy for HTTPS

Basic Caddy setup. Buy domain (e.g., `patient-management.de`) and deploy on
server.

=> Use the same provider used for `pohlig.net` :)

=> [https://www.providerdienste.de/](https://www.providerdienste.de/)
