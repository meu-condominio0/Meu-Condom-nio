from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class ComunicadoBase(BaseModel):
    titulo: str
    mensagem: str


class ComunicadoCreate(ComunicadoBase):
    pass


class ComunicadoUpdate(BaseModel):
    titulo: Optional[str] = None
    mensagem: Optional[str] = None


class ComunicadoResponse(ComunicadoBase):
    id: int
    criado_em: datetime
    atualizado_em: Optional[datetime]

    class Config:
        orm_mode = True
