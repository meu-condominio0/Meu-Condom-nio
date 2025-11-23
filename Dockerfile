# ============================
# Etapa 1: Build do React (Vite)
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copia arquivos de dependências para aproveitar cache
COPY package.json package-lock.json* yarn.lock* ./

# Instala TODAS as dependências (incluindo devDependencies)
# (precisamos do typescript / tsc para rodar o build)
RUN if [ -f yarn.lock ]; then \
        yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
        npm ci; \
    else \
        npm install; \
    fi

# Copia o restante do projeto
COPY . .

# Faz o build (usa o script "build": "tsc -b && vite build")
RUN npm run build || yarn build


# ============================
# Etapa 2: Servir com Nginx
# ============================
FROM nginx:alpine AS production

# Limpa os arquivos default do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o build gerado pelo Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expõe a porta padrão HTTP
EXPOSE 80

# Sobe o Nginx
CMD ["nginx", "-g", "daemon off;"]
