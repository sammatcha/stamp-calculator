# Stamp Calculator
A self-hosted web app that calculates how many stamps are needed for retail letter postage and compares the cost with USPS metered pricing based on envelope weight

## Tech Stack
Node.js · Express · Docker · NGINX · USPS Postal API · Prometheus · Grafana · Vitest

## Features
- Calculate postage by envelope weight
- Compare retail stamp pricing with USPS metered pricing
- Application monitoring with Prometheus and Grafana and alerting via Discord
- Containerized with Docker and Docker Compose

## Deployment
Self-hosted with Docker and NGINX reverse proxy

## Getting Started
Install Dependencies
```
npm install
```

Start Dev Server<br>
```
npm run dev
```
## Backend API
The Express backend handles USPS metered pricing requests
```
cd backend
npm install
node server.js
```

## Docker
```
# Build and Run
docker compose up -d --build

# View logs
docker compose logs -f web

# Stop Container
docker compose down

# Check status of running containers

docker ps
```
