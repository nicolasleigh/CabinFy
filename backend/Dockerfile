FROM node:22-slim
WORKDIR /app
# fix prisma error: Prisma failed to detect the libssl/openssl version to use
RUN apk add --no-cache openssl
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY .env ./
RUN npx prisma generate
RUN npx prisma migrate deploy
COPY ./ ./
RUN npm run build
EXPOSE 8081
CMD ["npm", "start"]
