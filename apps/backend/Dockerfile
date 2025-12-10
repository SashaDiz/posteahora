# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS base
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache bash
RUN corepack enable

WORKDIR /app

FROM base AS builder
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm run prisma-generate
RUN pnpm run build:backend
RUN pnpm prune --prod

FROM node:22-alpine AS runner
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app
RUN corepack enable
ENV NODE_ENV=production

COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/tsconfig.base.json /app/tsconfig.json ./
COPY --from=builder /app/apps/backend/start.js /app/apps/backend/start.js
COPY --from=builder /app/apps/backend/dist /app/apps/backend/dist
COPY --from=builder /app/apps/backend/src /app/apps/backend/src
COPY --from=builder /app/libraries /app/libraries
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 3000
CMD ["node", "apps/backend/start.js"]

