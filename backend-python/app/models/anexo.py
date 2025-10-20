from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from ..database import Base

class Anexo(Base):
    __tablename__ = "anexos"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    nome = Column(String, nullable=False)
    categoria = Column(String, nullable=False)
    descricao = Column(String)
    tipo = Column(String, nullable=False)
    tamanho = Column(String, nullable=False)
    data_upload = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    url = Column(String, nullable=False)
