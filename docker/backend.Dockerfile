# syntax=docker/dockerfile:1.7

FROM --platform=$TARGETPLATFORM node:23-alpine AS base
ENV NODE_ENV=production
WORKDIR /app

FROM base AS deps
COPY backend/package*.json ./
# If you have native addons: RUN apk add --no-cache python3 make g++
RUN npm install --omit=dev

FROM base AS runtime
# node user/group already exist in official images
USER node
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --chown=node:node backend/ ./

# ENV PORT=32916
# EXPOSE 32916

# Optional healthcheck (needs curl)
USER root
RUN apk add --no-cache curl
USER node

ARG PORT
EXPOSE ${PORT}
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s CMD curl -fsS http://localhost:${PORT}/healthz || exit 1


CMD ["node","server.js"]
