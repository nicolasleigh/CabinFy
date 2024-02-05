FROM node:21-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ ./
RUN npm run build
CMD ["npm", "run", "server"]

# FROM nginx:stable-alpine
# COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 8081
# CMD ["nginx", "-g", "daemon off;"]