# Stage 1: Build React frontend
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Run frontend + custom Express backend
FROM node:18

WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy frontend build and backend files
COPY --from=builder /app/dist ./dist
COPY server ./server

# Install backend deps (express, cors, uuid)
RUN npm install express cors uuid

# Install static file server
RUN npm install -g serve

# Run backend and frontend together
CMD npx concurrently "serve -s dist -l 3000" "node server/server.js"
