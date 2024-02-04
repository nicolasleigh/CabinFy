FROM node:21-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
ADD /home/nicolas/ssl/linze_me_chain.crt /home/nicolas/ssl/server.key /etc/ssl/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]