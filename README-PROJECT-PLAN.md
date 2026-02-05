# Project Plan

## High Level Plan

[x] 1. Setup main project structure
[x] 2. Setup frontend with Vue.js, etc.
[x] 3. Setup backend with node, express, etc.
[x] 4. Create required classes/types/etc. for patients
[x] 5. Create basic api endpoints (GET, POST, PUT, DELETE)
[ ] 6. Add basic pages to add/view/update patient data
[ ] 7. Setup docker
[ ] 8. Setup Caddy for HTTPS

## Detailed Plan

### 1. Setup main project structure

Mainly done by Webstorm: `package.json`, `package-lock.json`, `tsconfig.json`, `src/`

Published to Github via `gh repo create application-patient-care --private --source=. --remote=origin --push`

### 2. Setup frontend with Vue.js, etc.

Make sure that the frontend can be served by `npm run dev` and loads a basic Vue SPA.

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

tbd

### 5. Create basic api endpoints (GET, POST, PUT, DELETE)

tbd

### 6. Add basic pages to add/view/update patient data

tbd

### 7. Setup docker

tbd

### 8. Setup Caddy for HTTPS

tbd