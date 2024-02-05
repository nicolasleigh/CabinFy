FROM node:21-alpine
WORKDIR /app
ARG NODE_ENV  
ENV NODE_ENV=$NODE_ENV 
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
RUN npm install
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build
COPY ./ ./
EXPOSE 8080
CMD ["npm","run","start"]
