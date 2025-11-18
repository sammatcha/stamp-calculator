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
Build Image <br>
`
docker build -t <container-name> .
`

Run Container <br>
`
docker run -d -p 8080:8080 <container-name>
`
