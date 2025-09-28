FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production=false
COPY tsconfig.json ./
COPY eslint.config.js ./
COPY src ./src
CMD ["npm", "run", "dev"]
