from sqlalchemy.orm import Session
from app.models.marketplace import Marketplace
import os

UPLOAD_DIR = "backendpy/uploads/marketplace"


def criar_anuncio(db: Session, data: dict):
    novo = Marketplace(**data)

    if novo.imagens is None:
        novo.imagens = ""

    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo


def listar_anuncios(db: Session):
    anuncios = (
        db.query(Marketplace)
        .order_by(Marketplace.data_publicacao.desc())
        .all()
    )

    for a in anuncios:
        if a.imagens is None:
            a.imagens = ""
    return anuncios


def obter_anuncio(db: Session, id: int):
    anuncio = (
        db.query(Marketplace)
        .filter(Marketplace.id_anuncio == id)
        .first()
    )

    if anuncio and anuncio.imagens is None:
        anuncio.imagens = ""

    return anuncio


def deletar_anuncio(db: Session, id: int):
    anuncio = obter_anuncio(db, id)
    if not anuncio:
        return None

    # 🔥 Deletar imagens físicas
    if anuncio.imagens:
        lista = anuncio.imagens.split(",")
        for nome in lista:
            caminho = os.path.join(UPLOAD_DIR, nome)
            if os.path.exists(caminho):
                os.remove(caminho)

    db.delete(anuncio)
    db.commit()
    return anuncio
