# ============================
# Etapa 1: Build do React (Vite)
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copia arquivos de dependências para aproveitar cache
COPY package.json package-lock.json* yarn.lock* ./

# Primeiro tenta usar npm, se não existir lock tenta yarn
RUN if [ -f package-lock.json ]; then \
        npm ci --omit=dev; \
    elif [ -f yarn.lock ]; then \
        yarn install --frozen-lockfile; \
    else \
        npm install; \
    fi

# Copia o restante do projeto
COPY . .

# Faz o build
RUN npm run build || yarn build


# ============================
# Etapa 2: Servir com Nginx
# ============================
FROM nginx:alpine AS production

# Remove arquivos default
RUN rm -rf /usr/share/nginx/html/*

# Copia o build do React para a pasta do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Define usuário non-root (melhor segurança)
USER nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
