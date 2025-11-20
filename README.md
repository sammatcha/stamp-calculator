# stamps calculator
Simple stamp calculator for how much postage to use for retail letter envelopes based on weight.<br>
Uses USPS API to fetch metered pricing for letter envelopes.

Stack
- Node.js/ Express
- Docker
- NGINX
- USPS Postal API

## Getting Started
Install Dependencies <br>
`
npm install
`

Start Dev Server<br>
`
npm run dev
`

## Docker
Docker and Docker Compose
- This is done in my project
```
# Build and Run
docker compose up -d --build

# View logs
docker compose logs -f web

# Stop Container
docker compose down
```

Check status of running containers<br>
`
docker ps
`
