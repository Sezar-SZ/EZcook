#!/bin/bash

pnpx prisma generate
pnpx prisma db push
node dist/main.js