# backendpy/app/schemas/visitante.py

from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from ..models.visitante import TipoVisitante, StatusVisita

class VisitanteBase(BaseModel):
    nome: str
    tipo: TipoVisitante
    
    # <-- MUDANÇAS AQUI -->
    cpf: Optional[str] = None
    telefone: Optional[str] = None

    apartamento: str
    preAutorizado: Optional[bool] = False
    recorrente: Optional[bool] = False

class VisitanteCreate(VisitanteBase):
    pass

class VisitanteUpdateStatus(BaseModel):
    status: StatusVisita

class Visitante(VisitanteBase):
    id: str
    status: StatusVisita
    dataHora: datetime
    entrada: Optional[datetime] = None
    observacao: Optional[str] = None 
    
    
    class Config:
        from_attributes = True

class VisitanteFinalizar(BaseModel): 
    observacao: Optional[str] = None