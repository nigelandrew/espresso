# Stage 1: Build React frontend
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve built frontend + run json-server
FROM node:18

WORKDIR /app

# Install json-server and static file server
RUN npm install -g json-server serve

# Copy build output from previous stage
COPY --from=builder /app/dist ./dist

# Copy db.json for json-server
COPY ./server/db.json ./db.json

# Run frontend and API together
CMD concurrently "serve -s dist -l 3000" "json-server --watch db.json --port 4000"

# Install concurrently to run both commands in one container
RUN npm install -g concurrently
