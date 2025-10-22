# ============================
# Etapa 1: Build do React
# ============================
FROM node:20 AS builder
WORKDIR /app

# Copia os arquivos de dependências e instala
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install --frozen-lockfile || yarn install --frozen-lockfile

# Copia o restante do projeto e faz o build
COPY . .
RUN npm run build || yarn build


# ============================
# Etapa 2: Servir com Nginx
# ============================
FROM nginx:alpine

# Copia o build do React para o diretório padrão do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia sua configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expõe a porta padrão
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
