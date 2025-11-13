from sqlalchemy import Column, Integer, String, Float, Text, DateTime, Enum
from sqlalchemy.sql import func
from ..database import Base
import enum
from datetime import datetime

class CategoriaEnum(str, enum.Enum):
    servicos = "servicos"
    vendas = "vendas"
    trocas = "trocas"

class StatusEnum(str, enum.Enum):
    ativo = "ativo"
    vendido = "vendido"
    pausado = "pausado"

class Marketplace(Base):
    __tablename__ = "marketplace"

    id_anuncio = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(255), nullable=False)
    descricao = Column(Text, nullable=False)
    preco = Column(Float, nullable=True)
    categoria = Column(Enum(CategoriaEnum), nullable=False)
    subcategoria = Column(String(100))

    nome_vendedor = Column(String(255), nullable=False)
    apartamento_vendedor = Column(String(20), nullable=False)

    avaliacao = Column(Float, default=5.0)
    total_avaliacoes = Column(Integer, default=0)

    imagem_principal = Column(String(500), nullable=True)

    # 🔥 Aqui agora é CERTO: uma coluna STRING com vários arquivos separados por vírgula
    imagens = Column(Text, nullable=True)

    data_publicacao = Column(DateTime, default=datetime.utcnow)
    favoritos = Column(Integer, default=0)
    telefone = Column(String(20))
    whatsapp = Column(String(20))
    status = Column(Enum(StatusEnum), default=StatusEnum.ativo)

    # 🔥 propriedade que transforma string -> lista
    @property
    def imagens_lista(self):
        if not self.imagens:
            return []
        return self.imagens.split(",")
