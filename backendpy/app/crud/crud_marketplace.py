from sqlalchemy.orm import Session
from app.models.marketplace import Marketplace

def criar_anuncio(db: Session, data: dict):
    """
    Cria um novo anúncio usando um dict com todos os dados,
    incluindo a lista de imagens.
    """
    novo = Marketplace(**data)

    # Garantir que imagens nunca seja None
    if novo.imagens is None:
        novo.imagens = []

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

    # 🔥 Corrigir cada registro vindo do banco
    for a in anuncios:
        if a.imagens is None:
            a.imagens = []

    return anuncios


def obter_anuncio(db: Session, id: int):
    anuncio = (
        db.query(Marketplace)
        .filter(Marketplace.id_anuncio == id)
        .first()
    )

    # 🔥 Evitar erro quando retornar individualmente
    if anuncio and anuncio.imagens is None:
        anuncio.imagens = []

    return anuncio


def deletar_anuncio(db: Session, id: int):
    anuncio = obter_anuncio(db, id)
    if anuncio:
        db.delete(anuncio)
        db.commit()
    return anuncio
