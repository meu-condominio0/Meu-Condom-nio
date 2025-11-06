from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.marketplace import Marketplace
from schemas.marketplace_schema import MarketplaceCreate

router = APIRouter(
    prefix="/api/marketplace",  # <-- ajustado para o padrão da atividade
    tags=["Marketplace"]
)

@router.post("/", status_code=status.HTTP_201_CREATED)
def criar_anuncio(anuncio: MarketplaceCreate, db: Session = Depends(get_db)):
    try:
        novo_anuncio = Marketplace(**anuncio.dict())
        db.add(novo_anuncio)
        db.commit()
        db.refresh(novo_anuncio)
        return {"message": "Anúncio criado com sucesso!", "id": novo_anuncio.id_anuncio}

    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Erro interno: {e}")

@router.get("/")
def listar_anuncios(db: Session = Depends(get_db)):
    return db.query(Marketplace).all()