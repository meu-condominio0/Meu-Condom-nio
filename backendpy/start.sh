#!/bin/sh
echo "⏳ Aguardando o banco de dados ficar pronto..."
sleep 10
echo "✅ Banco pronto, iniciando o backend..."
uvicorn app.main:app --host 0.0.0.0 --port 8000
