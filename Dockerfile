# Étape 1 : Build du site Astro
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Étape 2 : Serveur web statique ultra-léger
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Configuration Nginx propre (pages sans .html + cache)
RUN printf 'server {\n\
    listen 80;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ $uri.html =404;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]