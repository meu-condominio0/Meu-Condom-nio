from sqlalchemy.orm import Session
from typing import List, Optional

from ..models.comunicado import Comunicado
from ..schemas.comunicado import (
    ComunicadoCreate,
    ComunicadoUpdate,
)


class ComunicadoCRUD:
    def listar(self, db: Session) -> List[Comunicado]:
        return db.query(Comunicado).order_by(Comunicado.criado_em.desc()).all()

    def buscar_por_id(self, db: Session, comunicado_id: int) -> Optional[Comunicado]:
        return db.query(Comunicado).filter(Comunicado.id == comunicado_id).first()

    def criar(self, db: Session, payload: ComunicadoCreate) -> Comunicado:
        novo = Comunicado(
            titulo=payload.titulo,
            mensagem=payload.mensagem,
        )
        db.add(novo)
        db.commit()
        db.refresh(novo)
        return novo

    def atualizar(self, db: Session, db_obj: Comunicado, payload: ComunicadoUpdate):
        data = payload.dict(exclude_unset=True)
        for campo, valor in data.items():
            setattr(db_obj, campo, valor)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remover(self, db: Session, db_obj: Comunicado):
        db.delete(db_obj)
        db.commit()
