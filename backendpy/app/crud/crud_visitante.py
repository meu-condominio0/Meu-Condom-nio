from sqlalchemy.orm import Session
import uuid
from datetime import datetime
from fastapi import HTTPException

from ..models import visitante as models_visitante 
from ..schemas import visitante as schema_visitante


# --- READ ---
def get_visitante(db: Session, visitante_id: str):
    return db.query(models_visitante.Visitante).filter(models_visitante.Visitante.id == visitante_id).first()


def get_visitantes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models_visitante.Visitante).offset(skip).limit(limit).all()


# --- CREATE ---
def create_visitante(db: Session, visitante: schema_visitante.VisitanteCreate):
    novo_id = str(uuid.uuid4())
    db_visitante = models_visitante.Visitante(
        id=novo_id,
        **visitante.model_dump()
    )
    db.add(db_visitante)
    db.commit()
    db.refresh(db_visitante)
    return db_visitante


# --- UPDATE STATUS ---

def update_visitante_status(db: Session, visitante_id: str, status_update: schema_visitante.VisitanteUpdateStatus):
    db_visitante = get_visitante(db, visitante_id)
    if not db_visitante:
        raise HTTPException(status_code=404, detail="Visitante não encontrado")

    novo_status = status_update.status
    db_visitante.status = novo_status

    print(f"🟡 Atualizando visitante {db_visitante.nome} para status: {novo_status}")

    # ✅ Registra a ENTRADA automaticamente
    if novo_status == models_visitante.StatusVisita.dentro:
        db_visitante.entrada = datetime.now()
        print(f"✅ Entrada registrada em: {db_visitante.entrada}")

    # ✅ Registra a SAÍDA automaticamente
    elif novo_status == models_visitante.StatusVisita.finalizado:
        if not db_visitante.saida:
            db_visitante.saida = datetime.now()
            print(f"✅ Saída registrada em: {db_visitante.saida}")
        else:
            print(f"⚠️ Saída já existia: {db_visitante.saida}")

    db.commit()
    db.refresh(db_visitante)
    return db_visitante

# --- FINALIZAR VISITA ---

def finalizar_visita(db, visitante_id: str, visita_final: schema_visitante.VisitanteFinalizar):
    db_visitante = (
        db.query(models_visitante.Visitante)
        .filter(models_visitante.Visitante.id == visitante_id)
        .first()
    )

    if not db_visitante:
        raise HTTPException(status_code=404, detail="Visitante não encontrado")

    # ✅ Só finaliza quem estiver dentro
    if db_visitante.status != models_visitante.StatusVisita.dentro:
        raise HTTPException(status_code=400, detail="A visita precisa estar em andamento para ser finalizada.")

    # ✅ Atualiza status e registra a saída
    db_visitante.status = models_visitante.StatusVisita.finalizado
    db_visitante.saida = datetime.now()  # <-- Aqui salva a hora da saída

    # ✅ Salva observação (se houver)
    if visita_final.observacao:
        db_visitante.observacao = visita_final.observacao

    db.commit()
    db.refresh(db_visitante)

    return db_visitante

# --- DELETE ---
def delete_visitante(db: Session, visitante_id: str):
    db_visitante = get_visitante(db, visitante_id)
    if not db_visitante:
        raise HTTPException(status_code=404, detail="Visitante não encontrado")
    db.delete(db_visitante)
    db.commit()
    return db_visitante
