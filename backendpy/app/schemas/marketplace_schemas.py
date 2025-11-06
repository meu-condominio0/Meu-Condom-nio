from pydantic import BaseModel, constr, condecimal
from enum import Enum
from typing import Optional

class CategoriaEnum(str, Enum):
    troca = 'troca'
    venda = 'venda'
    servico = 'serviço'

class MarketplaceCreate(BaseModel):
    fk_morador: int
    titulo: constr(min_length=1, max_length=100)
    descricao: constr(min_length=1, max_length=500)
    categoria: CategoriaEnum
    preco: Optional[condecimal(max_digits=10, decimal_places=2)] = None
    imagem_url: Optional[str] = None