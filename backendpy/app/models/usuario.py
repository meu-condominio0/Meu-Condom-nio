from sqlalchemy import Column, Integer, String, Enum, Date, DateTime, Text
from sqlalchemy.sql import func
from ..database import Base
class Usuario(Base):
      __tablename__ = "usuarios"

      id = Column(Integer, primary_key=True, index=True)
      nome = Column(String(255), nullable=False)
      email = Column(String(255), unique=True, nullable=False, index=True)
      telefone = Column(String(20))
      apartamento = Column(String(50), nullable=False)
      bloco = Column(String(10), nullable=False)
      tipo = Column(Enum('morador', 'sindico', 'subsindico'), nullable=False, default='morador')
      status = Column(Enum('ativo', 'inativo', 'bloqueado'), nullable=False, default='ativo')
      data_ultimo_acesso = Column(Date)
      data_cadastro = Column(DateTime(timezone=True), server_default=func.now())
      observacoes = Column(Text)
      created_by = Column(Integer)  # ID do síndico que cadastrou
  