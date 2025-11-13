from pydantic import BaseModel, field_serializer
from typing import Optional, List
from enum import Enum
from datetime import datetime

class CategoriaEnum(str, Enum):
    servicos = "servicos"
    vendas = "vendas"
    trocas = "trocas"

class StatusEnum(str, Enum):
    ativo = "ativo"
    vendido = "vendido"
    pausado = "pausado"


class MarketplaceBase(BaseModel):
    titulo: str
    descricao: str
    preco: Optional[float] = None
    categoria: CategoriaEnum
    subcategoria: Optional[str] = None
    telefone: Optional[str] = None
    whatsapp: Optional[str] = None


class MarketplaceCreate(MarketplaceBase):
    nome_vendedor: str
    apartamento_vendedor: str


class MarketplaceResponse(MarketplaceBase):
    id_anuncio: int
    nome_vendedor: str
    apartamento_vendedor: str
    avaliacao: float
    total_avaliacoes: int
    imagem_principal: Optional[str]
    data_publicacao: datetime | None = None
    favoritos: int
    status: StatusEnum
    imagens: list[str] = []

class Config:
    from_attributes = True


    # 🔥 CONVERTE datetime → string automaticamente
    @field_serializer("data_publicacao")
    def serialize_data_publicacao(self, value: datetime | None, _info):
        if value:
            return value.strftime("%Y-%m-%d %H:%M:%S")
        return None

    class Config:
        from_attributes = True
