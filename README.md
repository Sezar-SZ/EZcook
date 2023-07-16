# EZCook

An app that will allow users to view, submit and like food recipes.

This app is built with Next.js v13 and Nest.js.

## Tech Stack

### Frontend

* Next.js
* Zod
* Zustand
* React-hook-form
* Tailwindcss
* axios

### Backend

* Nest.js
* Prisma
* Zod
* Passport (JWT Auth flow)
* Docker
  * Postgresql
  * Redis (to store Refresh token)

## Development FLow

Create .env files for both frontend and backend:

```sh
cp ./apps/backend/.env.sample ./apps/backend/.env
cp ./apps/frontend/.env.sample ./apps/frontend/.env
```

Run Database with docker:

```sh
cd ./apps/backend
docker compose up -d
```

Run apps in parallel:

```sh
# cd to the root of the project (directory of the main `package.json`)
pnpm dev
```

Lint:

```sh
pnpm lint:fix
```
