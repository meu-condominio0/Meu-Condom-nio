import enum
from sqlalchemy import Column, String, Boolean, DateTime, Enum, Text
from sqlalchemy.sql import func
from ..database import Base

class TipoVisitante(str, enum.Enum):
    visitante = "visitante"
    entrega = "entrega"

class StatusVisita(str, enum.Enum):
    aguardando = "aguardando"
    autorizado = "autorizado"
    negado = "negado"
    dentro = "dentro"
    finalizado = "finalizado"

class Visitante(Base):
    __tablename__ = "visitantes"

    id = Column(String(36), primary_key=True, index=True)  # UUID
    nome = Column(String(100), index=True, nullable=False)
    tipo = Column(Enum(TipoVisitante), nullable=False)

    cpf = Column(String(14), nullable=True)
    telefone = Column(String(20), nullable=True)

    apartamento = Column(String(10), nullable=False)
    status = Column(Enum(StatusVisita), default=StatusVisita.aguardando)

    dataHora = Column(DateTime(timezone=True), server_default=func.now())
    entrada = Column(DateTime(timezone=True), nullable=True)
    saida = Column(DateTime(timezone=True), nullable=True)

    preAutorizado = Column(Boolean, default=False)
    recorrente = Column(Boolean, default=False)
    observacao = Column(Text, nullable=True)
