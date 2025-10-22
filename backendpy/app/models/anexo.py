from sqlalchemy import Column, String, DateTime
from sqlalchemy.sql import func
import uuid
from ..database import Base


class Anexo(Base):
    __tablename__ = "anexos"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    nome = Column(String(255), nullable=False)
    categoria = Column(String(100), nullable=False)
    descricao = Column(String(255), nullable=True)
    tipo = Column(String(50), nullable=False)
    tamanho = Column(String(50), nullable=False)
    data_upload = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    url = Column(String(255), nullable=False)
