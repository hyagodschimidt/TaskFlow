FROM node:24-bookworm-slim

WORKDIR /app

RUN corepack enable

EXPOSE 5173

CMD ["pnpm", "dev", "--host", "0.0.0.0"]