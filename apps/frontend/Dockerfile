FROM node:18-alpine

RUN npm i -g pnpm

WORKDIR /app

COPY . .

RUN rm -rf pnpm-lock.yaml

WORKDIR /app/apps/frontend

RUN pnpm install --filter frontend --prod

RUN pnpm build

CMD [ "pnpm start" ]
