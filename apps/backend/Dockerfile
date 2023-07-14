FROM node:18-alpine

RUN npm i -g pnpm

WORKDIR /app

COPY . .

RUN ls

RUN rm -rf pnpm-lock.yaml

WORKDIR /app/apps/backend

RUN pnpm install --filter backend --prod

RUN pnpx prisma generate

RUN ls

RUN pnpm build

CMD [ "./migrate-and-start.sh" ]
