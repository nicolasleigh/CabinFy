FROM node:21-alpine
WORKDIR /app
# ARG NODE_ENV  
# ENV NODE_ENV=$NODE_ENV 
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
RUN npm install
RUN npx prisma generate
RUN npx prisma migrate deploy
COPY ./ ./
RUN npm run build
EXPOSE 8080
CMD ["npm","run","start"]
