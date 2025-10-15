# Dockerfile para aplicação Meu-Condomínio

# Etapa 1: Build da aplicação React
FROM node:20 AS builder
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install --frozen-lockfile || yarn install --frozen-lockfile
COPY . .
RUN npm run build || yarn build

# Etapa 2: Servir aplicação com nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
