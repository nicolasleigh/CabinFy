FROM node:21-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ ./
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build
EXPOSE 8080
CMD ["npm","run","start"]
