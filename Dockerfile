FROM node:13.12.0-alpine as build

WORKDIR /app
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
# Install all packages from package.json
RUN npm ci --silent
COPY frontend/ ./

RUN npm run build

#PREPARE NGINX
FROM nginx:stable-alpine
# Copy react build from app to nginx html
COPY --from=build /app/build /usr/share/nginx/html

# Nginx will read index.html and react statics from this react build
RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx/nginx.conf /etc/nginx/conf.d

CMD ["nginx","-g","daemon off;"]