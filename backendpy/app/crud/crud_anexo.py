from sqlalchemy.orm import Session
from ..models.anexo import Anexo
from ..schemas.anexo import AnexoCreate
from uuid import uuid4
from uuid import UUID
from fastapi import HTTPException

def criar_anexo(db: Session, anexo: AnexoCreate):
    db_anexo = Anexo(
        id=uuid4(),
        nome=anexo.nome,
        categoria=anexo.categoria,
        descricao=anexo.descricao,
        tipo=anexo.tipo,
        tamanho=anexo.tamanho,
        url=anexo.url,
    )
    db.add(db_anexo)
    db.commit()
    db.refresh(db_anexo)
    return db_anexo

def listar_anexos(db: Session):
    return db.query(Anexo).all()

def deletar_anexo(db: Session, anexo_id: UUID):
    anexo = db.query(Anexo).filter(Anexo.id == anexo_id).first()
    if not anexo:
        raise HTTPException(status_code=404, detail="Anexo não encontrado")
    db.delete(anexo)
    db.commit()
    return anexo