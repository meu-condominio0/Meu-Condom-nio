from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import os
from ..database import get_db
from app.crud import crud_marketplace
from app.schemas.marketplace_schema import MarketplaceResponse
import uuid
from fastapi.responses import JSONResponse


router = APIRouter(
    prefix="/api/marketplace",
    tags=["Marketplace"]
)

UPLOAD_DIR = "backendpy/uploads/marketplace"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ================================
# 🚀 CRIAR ANÚNCIO + IMAGENS
# ================================



@router.post("/")
async def criar_anuncio(
    titulo: str = Form(...),
    descricao: str = Form(...),
    preco: Optional[float] = Form(None),
    categoria: str = Form(...),
    subcategoria: Optional[str] = Form(None),
    nome_vendedor: str = Form(...),
    apartamento_vendedor: str = Form(...),
    telefone: Optional[str] = Form(None),
    whatsapp: Optional[str] = Form(None),
    imagens: List[UploadFile] = File(None),  # aceita 0–5 imagens
    db: Session = Depends(get_db)
):
    # --- validação de quantidade de imagens ---
    lista_imagens = []
    if imagens:
        if len(imagens) > 5:
            raise HTTPException(status_code=400, detail="Máximo de 5 imagens por anúncio.")

        # criar pasta se não existir
        os.makedirs(UPLOAD_DIR, exist_ok=True)

        # salvar imagens
        for img in imagens:
            nome_arquivo = f"{img.filename}"
            caminho = os.path.join(UPLOAD_DIR, nome_arquivo)

            # grava no disco
            with open(caminho, "wb") as f:
                f.write(await img.read())

            lista_imagens.append(nome_arquivo)

    # monta dict final para o CRUD
    anuncio_data = {
        "titulo": titulo,
        "descricao": descricao,
        "preco": preco,
        "categoria": categoria,
        "subcategoria": subcategoria,
        "nome_vendedor": nome_vendedor,
        "apartamento_vendedor": apartamento_vendedor,
        "telefone": telefone,
        "whatsapp": whatsapp,
        "imagens": ",".join(lista_imagens) if lista_imagens else None
    }

    novo = crud_marketplace.criar_anuncio(db, anuncio_data)
    return novo

@router.get("/", response_model=list[MarketplaceResponse])
def listar(db: Session = Depends(get_db)):
    anuncios = crud_marketplace.listar_anuncios(db)
    for a in anuncios:
        a.imagens = a.imagens_lista  # <<< transforma string → list
    return anuncios

@router.delete("/{id}")
def deletar_anuncio(id: int, db: Session = Depends(get_db)):
    anuncio = crud_marketplace.deletar_anuncio(db, id)

    if not anuncio:
        raise HTTPException(
            status_code=404,
            detail=f"Anúncio {id} não encontrado."
        )

    return {
        "message": "Anúncio deletado com sucesso.",
        "id": id
    }

