from sqlalchemy import Column, Integer, String, Enum, ForeignKey
from sqlalchemy.orm import validates
from app.database import Base
import enum

class CategoriaEnum (str, enum.Enum):
    troca = 'troca'
    venda = 'venda'
    servico = 'serviço'

class Marketplace(Base):
    __tablename__ = 'marketplace'

    id_anuncio = Column(Integer, primary_key=True, index=True)
    fk_morador = Column(Integer, ForeignKey('morador.id'), nullable=False)
    titulo = Column(String(100), nullable=False)
    descricao = Column(String(500), nullable=False)
    categoria = Column(Enum(CategoriaEnum), nullable=False)

    @validates('titulo', 'descricao', 'categoria')
    def validar_campos(self, key, value):
        if not value:
            raise ValueError(f"O campo '{key}'é obrigatorio.")
        
        if key == 'titulo' and len(value) > 100:
            raise ValueError ('O titulo deve ter no máximo 100 caracteres.')
        
        if key == 'descricao' and len(value) > 500:
            raise ValueError('A descricao deve conter no maximo 500 caracteres')
        
        if key == 'categoria' and value not in [c.value for c in CategoriaEnum]:
            raise ValueError("categoria invalida. Use: 'troca', 'venda', ou 'servico'.")
        
        return value