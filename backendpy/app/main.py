from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# Importações principais
from .database import engine, Base
from .routers import usuario as usuario_router
from .routers import visitante as visitante_router
from .routers import anexo as anexo_router
from .routers import marketplace as marketplace_router
from .core.auth_router import router as auth_router
from .routers import comunicado_router
from fastapi.staticfiles import StaticFiles

# Importação do criador do síndico padrão
from .setup_default_admin import criar_sindico_padrao


# Instância da aplicação FastAPI
app = FastAPI(
    title="Backend Condomínio",
    version="1.0.0"
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://localhost:80",
        "http://localhost:5173",
        "http://127.0.0.1",
        "http://127.0.0.1:80",
        "http://127.0.0.1:5173",
        "http://frontend",
        "http://frontend:80",
        "http://backend",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Criar tabelas automaticamente
Base.metadata.create_all(bind=engine)


# Criar síndico padrão ao iniciar o backend
@app.on_event("startup")
def startup_event():
    criar_sindico_padrao()


# Registro das rotas
app.include_router(usuario_router.router, prefix="/api", tags=["Usuarios"])
app.include_router(visitante_router.router, prefix="/api", tags=["Visitante"])
app.include_router(anexo_router.router, prefix="/api", tags=["Anexos"])
app.include_router(marketplace_router.router)
app.include_router(auth_router)
app.include_router(comunicado_router.router)

# Uploads estáticos
app.mount("/uploads", StaticFiles(directory="backendpy/uploads"), name="uploads")


# Rota raiz
@app.get("/")
def read_root():
    return {"message": "Backend Condomínio rodando! Acesse /docs para Swagger."}
