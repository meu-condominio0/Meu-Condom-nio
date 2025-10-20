from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..crud.usuario import create_usuario, get_usuarios, update_usuario_status, delete_usuario, redefinir_senha, usuario_to_response
from ..schemas.usuario import UsuarioCreate, UsuarioResponse, TipoUsuario, StatusUsuario
from ..database import get_db

router = APIRouter()

# Placeholder para autenticação (só síndico; futuro: extrair de JWT token)
def get_current_sindico_id():
    return 1  # Exemplo fixo: ID do síndico logado

@router.post("/usuarios", response_model=UsuarioResponse, status_code=status.HTTP_201_CREATED)
def cadastrar_usuario(
    usuario: UsuarioCreate,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_sindico_id)
):
    try:
        novo_usuario = create_usuario(db=db, usuario=usuario, created_by=current_user_id)
        return usuario_to_response(novo_usuario)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/usuarios", response_model=List[UsuarioResponse])
def listar_usuarios(
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    search: Optional[str] = Query(None),
    tipo: Optional[TipoUsuario] = Query(None),
    status: Optional[StatusUsuario] = Query(None)
):
    usuarios = get_usuarios(db, skip=skip, limit=limit, search=search, tipo=tipo, status=status)
    return [usuario_to_response(u) for u in usuarios]

@router.put("/usuarios/{usuario_id}/status", response_model=UsuarioResponse)
def alterar_status(
    usuario_id: int,
    status: StatusUsuario,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_sindico_id)
):
    try:
        usuario = update_usuario_status(db, usuario_id, status)
        return usuario_to_response(usuario)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.delete("/usuarios/{usuario_id}")
def excluir_usuario(
    usuario_id: int,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_sindico_id)
):
    try:
        delete_usuario(db, usuario_id)
        return {"message": "Usuário excluído com sucesso"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/usuarios/{usuario_id}/redefinir-senha")
def reset_senha(
    usuario_id: int,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_sindico_id)
):
    try:
        result = redefinir_senha(db, usuario_id)
        return result
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
