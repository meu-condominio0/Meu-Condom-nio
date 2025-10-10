# backendpy/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# --- IMPORTS ADICIONADOS ---
from .database import engine, Base
from .routers import usuario as usuario_router
from .routers import visitante as visitante_router # Adicionamos o router de visitante
# --- FIM DOS IMPORTS ADICIONADOS ---

# --- CRIAÇÃO DAS TABELAS (ESSENCIAL!) ---
# Esta linha verifica todos os models que herdam de 'Base' (do database.py)
# e cria suas respectivas tabelas no banco de dados se elas não existirem.
Base.metadata.create_all(bind=engine)
# --- FIM DA CRIAÇÃO DAS TABELAS ---

# Carrega variáveis de ambiente
load_dotenv()

app = FastAPI(
    title="Backend Condomínio", # Título atualizado
    version="1.0.0"
)

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclui as rotas de usuários
app.include_router(usuario_router.router, prefix="/api", tags=["Usuarios"])

# --- ROTA DE VISITANTE ADICIONADA ---
app.include_router(visitante_router.router, prefix="/api", tags=["Visitante"])
# --- FIM DA ROTA ADICIONADA ---

# Rota raiz
@app.get("/")
def read_root():
    return {"message": "Backend Condomínio rodando! Acesse /docs para Swagger."}