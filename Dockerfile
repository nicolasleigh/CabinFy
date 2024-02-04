FROM node:21-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /etc/ssl/linze_me_chain.crt /etc/ssl/linze_me_chain.crt
COPY /etc/ssl/server.key /etc/ssl/server.key

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]