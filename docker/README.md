# docker

## build image

build image for both arm64 & amd64 architectures:

```sh
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -f backend.Dockerfile \
  -t usps-api:dev \
  ../backend
```

## run container locally

run container locally for testing:

```sh
docker run -d --name usps-api \
  -p 3001:3001 \
  -e NODE_ENV=production \
  -e PORT=3001 \
  -e CORS_ORIGIN="*" \
  usps-api:dev
```
