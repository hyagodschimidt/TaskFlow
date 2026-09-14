# TaskFlow

## Docker

### Primeiro uso / banco novo

```bash
docker compose up -d db
docker compose --profile tools run --rm migrate
docker compose up -d