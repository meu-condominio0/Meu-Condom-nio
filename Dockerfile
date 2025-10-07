# =========================
# ETAPA 1: Build da aplicação React
# =========================
FROM node:20 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Gera o build de produção (saída vai para /app/dist)
RUN npm run build

# =========================
# ETAPA 2: Servir com Nginx
# =========================
FROM nginx:alpine

# Remove o conteúdo padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o build gerado na etapa anterior para o diretório servido pelo Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando padrão para manter o Nginx rodando
CMD ["nginx", "-g", "daemon off;"]
