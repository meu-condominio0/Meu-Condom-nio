# backendpy/app/routers/visitante.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. crud import crud_visitante
from ..schemas import visitante as schema_visitante 
from ..database import get_db

router = APIRouter(
    prefix="/visitante",
    tags=["Visitante"],
)

@router.post("/", response_model=schema_visitante.Visitante, status_code=201)
def create_visitante_endpoint(visitante: schema_visitante.VisitanteCreate, db: Session = Depends(get_db)):
    return crud_visitante.create_visitante(db=db, visitante=visitante)

@router.get("/", response_model=List[schema_visitante.Visitante])
def read_visitantes_endpoint(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    visitantes = crud_visitante.get_visitantes(db, skip=skip, limit=limit)
    return visitantes

@router.patch("/{visitante_id}/status", response_model=schema_visitante.Visitante)
def update_visitante_status_endpoint(
    visitante_id: str, 
    status_update: schema_visitante.VisitanteUpdateStatus, 
    db: Session = Depends(get_db)
):
    db_visitante = crud_visitante.update_visitante_status(
        db=db, visitante_id=visitante_id, status_update=status_update
    )
    if db_visitante is None:
        raise HTTPException(status_code=404, detail="Visitante não encontrado")
    return db_visitante

# ... (depois do endpoint de PATCH) ...

# --- Endpoint para FINALIZAR uma visita ---
@router.post("/{visitante_id}/finalizar", response_model=schema_visitante.Visitante)
def finalizar_visita_endpoint(
    visitante_id: str, 
    visita_final: schema_visitante.VisitanteFinalizar,
    db: Session = Depends(get_db)
):
    db_visitante = crud_visitante.finalizar_visita(
        db=db, visitante_id=visitante_id, visita_final=visita_final
    )
    if db_visitante is None:
        raise HTTPException(status_code=404, detail="Visitante não encontrado")
    return db_visitante

# --- Endpoint para DELETAR um visitante ---
@router.delete("/{visitante_id}", response_model=schema_visitante.Visitante)
def delete_visitante_endpoint(visitante_id: str, db: Session = Depends(get_db)):
    db_visitante = crud_visitante.delete_visitante(db=db, visitante_id=visitante_id)
    if db_visitante is None:
        raise HTTPException(status_code=404, detail="Visitante não encontrado")
    return db_visitante