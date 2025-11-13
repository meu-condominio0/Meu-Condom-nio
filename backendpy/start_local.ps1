Write-Host "🚀 Ativando ambiente virtual e iniciando backend local..." -ForegroundColor Cyan

# Ativa o venv
& .\venv\Scripts\Activate.ps1

# Instala dependências (caso algo novo tenha sido adicionado)
pip install -r requirements.txt

# Sobe o servidor com reload automático
uvicorn app.main:app --reload
