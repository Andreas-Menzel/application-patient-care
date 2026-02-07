FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
COPY shared/package*.json ./shared/

RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

EXPOSE 3000

WORKDIR /app/backend

CMD ["node", "dist/index.js"]
