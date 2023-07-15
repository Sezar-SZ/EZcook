FROM node:18-alpine

RUN npm i -g pnpm

WORKDIR /app

COPY . .

WORKDIR /app/apps/backend

RUN pnpm add @nestjs/cli

RUN pnpm install --filter backend --prod

RUN pnpx prisma generate

RUN pnpm build

CMD [ "./migrate-and-start.sh" ]
