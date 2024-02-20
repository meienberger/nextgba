ARG NODE_VERSION="20.10"
ARG ALPINE_VERSION="3.18"

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS node_base

FROM node_base AS builder_base

RUN npm install pnpm -g

# BUILDER
FROM builder_base AS builder

WORKDIR /app

COPY ./pnpm-lock.yaml ./
RUN pnpm fetch

COPY ./package*.json ./

RUN pnpm install -r --prefer-offline 
COPY ./src ./src
COPY ./tsconfig.json ./tsconfig.json
COPY ./next.config.mjs ./next.config.mjs
COPY ./public ./public
COPY ./tailwind.config.ts ./tailwind.config.ts
COPY ./postcss.config.js ./postcss.config.js
COPY ./components.json ./components.json

RUN pnpm build

FROM node_base AS app

ENV NODE_ENV production

USER 1000:1000

WORKDIR /app

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=1000:1000 /app/.next/standalone ./
COPY --from=builder --chown=1000:1000 /app/.next/static ./.next/static

EXPOSE 3000

CMD ["npm", "run", "start"]
