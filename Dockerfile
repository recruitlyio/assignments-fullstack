FROM node:23-alpine

RUN corepack enable

WORKDIR /app

# Copy dependency files and install
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# disable next.js telemetry
RUN exec next telemetry disable

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
