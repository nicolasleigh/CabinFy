FROM node:21-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build
COPY ./ ./
EXPOSE 8080
CMD ["npm","run","start"]
