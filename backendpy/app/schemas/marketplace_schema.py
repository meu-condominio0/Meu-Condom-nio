from pydantic import BaseModel, constr, condecimal
from enum import Enum
from typing import Optional
from decimal import Decimal
class CategoriaEnum(str, Enum):
    servicos = 'servicos'
    vendas = 'vendas'
    trocas = 'trocas'

class MarketplaceCreate(BaseModel):
    fk_morador: int
    titulo: constr(min_length=1, max_length=100)
    descricao: constr(min_length=1, max_length=500)
    categoria: CategoriaEnum
    valor: Optional[Decimal] = None
    imagem_url: Optional[str] = None
    subcategoria: Optional[str] = None
    telefone: Optional[str] = None
    whatsapp: Optional[str] = None

    class Config:
        from_attributes = True  # substitui orm_mode no Pydantic v2