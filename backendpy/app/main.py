from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import os
from dotenv import load_dotenv

# Importações principais
from .database import engine, Base
from .routers import usuario as usuario_router
from .routers import visitante as visitante_router
from .routers import anexo as anexo_router  # Importação do novo router
from fastapi.staticfiles import StaticFiles

# Importa o model de anexo para garantir criação da tabela
from .models import anexo as modelo_anexo

# Carrega variáveis de ambiente
load_dotenv()

# Instância da aplicação FastAPI
app = FastAPI(
    title="Backend Condomínio",
    version="1.0.0"
)

# Configuração de CORS para o frontend React (localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Criação automática das tabelas
# Inclui usuário, visitante, anexo, etc., se herdarem de Base
Base.metadata.create_all(bind=engine)

# Registro dos routers da aplicação
app.include_router(usuario_router.router, prefix="/api", tags=["Usuarios"])
app.include_router(visitante_router.router, prefix="/api", tags=["Visitante"])
app.include_router(anexo_router.router, prefix="/api", tags=["Anexos"])

# Rota raiz
@app.get("/")
def read_root():
    return {"message": "Backend Condomínio rodando! Acesse /docs para Swagger."}

# Pasta de uploads — garante que existe
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Servir arquivos estáticos (PDFs, imagens, etc.)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
