from sqlalchemy.orm import Session
import uuid
from datetime import datetime

# MUDANÇA AQUI: Tornamos o import do model mais específico
from ..models import visitante as models_visitante 
from ..schemas import visitante as schema_visitante

# --- READ ---
def get_visitante(db: Session, visitante_id: str):
    # MUDANÇA AQUI: Usamos o novo nome 'models_visitante'
    return db.query(models_visitante.Visitante).filter(models_visitante.Visitante.id == visitante_id).first()

def get_visitantes(db: Session, skip: int = 0, limit: int = 100):
    # MUDANÇA AQUI: Usamos o novo nome 'models_visitante'
    return db.query(models_visitante.Visitante).offset(skip).limit(limit).all()

# --- CREATE ---
def create_visitante(db: Session, visitante: schema_visitante.VisitanteCreate):
    novo_id = str(uuid.uuid4())
    # MUDANÇA AQUI: Usamos o novo nome 'models_visitante'
    db_visitante = models_visitante.Visitante(
        id=novo_id,
        **visitante.model_dump()
    )
    db.add(db_visitante)
    db.commit()
    db.refresh(db_visitante)
    return db_visitante

# --- UPDATE ---
def update_visitante_status(db: Session, visitante_id: str, status_update: schema_visitante.VisitanteUpdateStatus):
    db_visitante = get_visitante(db, visitante_id)
    if not db_visitante:
        return None

    db_visitante.status = status_update.status
    
    # MUDANÇA AQUI: Usamos o novo nome 'models_visitante'
    if status_update.status == models_visitante.StatusVisita.dentro:
        db_visitante.entrada = datetime.now()
    elif status_update.status == models_visitante.StatusVisita.finalizado:
        db_visitante.saida = datetime.now()

    db.commit()
    db.refresh(db_visitante)
    return db_visitante

# --- FINALIZAR ---
def finalizar_visita(db: Session, visitante_id: str, visita_final: schema_visitante.VisitanteFinalizar):
    db_visitante = get_visitante(db, visitante_id)
    if not db_visitante:
        return None

    # MUDANÇA AQUI: Usamos o novo nome 'models_visitante'
    db_visitante.status = models_visitante.StatusVisita.finalizado
    db_visitante.saida = datetime.now()
    if visita_final.observacao:
        db_visitante.observacao = visita_final.observacao

    db.commit()
    db.refresh(db_visitante)
    return db_visitante

# --- DELETE ---
def delete_visitante(db: Session, visitante_id: str):
    db_visitante = get_visitante(db, visitante_id)
    if not db_visitante:
        return None
    db.delete(db_visitante)
    db.commit()
    return db_visitante