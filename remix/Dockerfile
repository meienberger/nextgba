ARG NODE_VERSION="iron"
ARG ALPINE_VERSION="3.20"

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS node_base

FROM node_base AS builder_base

RUN npm install pnpm -g

# BUILDER
FROM builder_base AS builder

WORKDIR /app

COPY ./pnpm-lock.yaml ./
RUN pnpm fetch

COPY ./package.json ./

RUN pnpm install -r --prefer-offline 

COPY ./app ./app
COPY ./tsconfig.json ./tsconfig.json
COPY ./vite.config.ts ./vite.config.ts
COPY ./public ./public
COPY ./tailwind.config.ts ./tailwind.config.ts
COPY ./postcss.config.js ./postcss.config.js
COPY ./components.json ./components.json

RUN pnpm build

FROM node_base AS app

ENV NODE_ENV production

WORKDIR /app


COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "run", "start"]
