FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS dev
RUN npm install
COPY src ./src
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS prod-deps
RUN npm install --omit=dev

FROM node:22-alpine AS prod
ENV NODE_ENV=production
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY package*.json ./
COPY src ./src
EXPOSE 3000
CMD ["node", "src/index.js"]
