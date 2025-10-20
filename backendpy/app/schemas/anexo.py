from pydantic import BaseModel
from uuid import UUID
from typing import Optional
from datetime import datetime

class AnexoBase(BaseModel):
    nome: str
    categoria: str
    descricao: Optional[str] = None
    tipo: str
    tamanho: str
    url: str

class AnexoCreate(AnexoBase):
    pass

class Anexo(AnexoBase):
    id: UUID
    data_upload: datetime

    class Config:
        orm_mode = True
