from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session


from ..database import get_db
from ..crud.comunicado_crud import ComunicadoCRUD
from ..schemas.comunicado import (
    ComunicadoCreate,
    ComunicadoUpdate,
    ComunicadoResponse,
)

router = APIRouter(prefix="/api/comunicados", tags=["Comunicados"])

crud = ComunicadoCRUD()


@router.get("", response_model=list[ComunicadoResponse])
def listar_comunicados(db: Session = Depends(get_db)):
    return crud.listar(db)


@router.get("/{comunicado_id}", response_model=ComunicadoResponse)
def obter_comunicado(comunicado_id: int, db: Session = Depends(get_db)):
    comunicado = crud.buscar_por_id(db, comunicado_id)
    if not comunicado:
        raise HTTPException(status_code=404, detail="Comunicado não encontrado")
    return comunicado


@router.post("", response_model=ComunicadoResponse, status_code=status.HTTP_201_CREATED)
def criar_comunicado(payload: ComunicadoCreate, db: Session = Depends(get_db)):
    return crud.criar(db, payload)


@router.put("/{comunicado_id}", response_model=ComunicadoResponse)
def atualizar_comunicado(
    comunicado_id: int, payload: ComunicadoUpdate, db: Session = Depends(get_db)
):
    comunicado = crud.buscar_por_id(db, comunicado_id)
    if not comunicado:
        raise HTTPException(status_code=404, detail="Comunicado não encontrado")
    return crud.atualizar(db, comunicado, payload)


@router.delete("/{comunicado_id}", status_code=status.HTTP_204_NO_CONTENT)
def remover_comunicado(comunicado_id: int, db: Session = Depends(get_db)):
    comunicado = crud.buscar_por_id(db, comunicado_id)
    if not comunicado:
        raise HTTPException(status_code=404, detail="Comunicado não encontrado")
    crud.remover(db, comunicado)
    return None
