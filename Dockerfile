FROM node:18-slim

COPY package.json package-lock.json ./src /app/

RUN npm install