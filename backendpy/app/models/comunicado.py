from sqlalchemy import Column, BigInteger, String, Text, DateTime, func
from ..database import Base
  # ajuste se sua base estiver em outro lugar


class Comunicado(Base):
    __tablename__ = "comunicados"

    id = Column(BigInteger, primary_key=True, index=True, autoincrement=True)
    titulo = Column(String(255), nullable=False)
    mensagem = Column(Text, nullable=False)
    criado_em = Column(DateTime, server_default=func.now(), nullable=False)
    atualizado_em = Column(DateTime, onupdate=func.now())
