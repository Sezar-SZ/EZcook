FROM node:18-alpine

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/apps/frontend

RUN pnpm install

RUN pnpm build

ENV NODE_ENV production

RUN pnpm --filter=backend --prod deploy prune

RUN pnpm install --prod

CMD ["pnpm start"]