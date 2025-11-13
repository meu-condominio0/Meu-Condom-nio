from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# Importações principais
from .database import engine, Base
from .routers import usuario as usuario_router
from .routers import visitante as visitante_router
from .routers import anexo as anexo_router  # Importação do novo router
from fastapi.staticfiles import StaticFiles
from .routers import marketplace as marketplace_router
from fastapi.staticfiles import StaticFiles






# Instância da aplicação FastAPI
app = FastAPI(
    title="Backend Condomínio",
    version="1.0.0"
)

# Configuração de CORS para o frontend React (localhost:5173)
# Configuração de CORS para o frontend React (localhost e Docker)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://localhost:80",
        "http://localhost:5173",
        "http://127.0.0.1",
        "http://127.0.0.1:80",
        "http://127.0.0.1:5173",
        "http://frontend",  # nome do container do frontend (Docker)
        "http://frontend:80",
        "http://backend",   # pra permitir chamadas internas entre containers
    ],
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
app.include_router(marketplace_router.router)
app.mount("/uploads", StaticFiles(directory="backendpy/uploads"), name="uploads")


# Rota raiz
@app.get("/")
def read_root():
    return {"message": "Backend Condomínio rodando! Acesse /docs para Swagger."}






