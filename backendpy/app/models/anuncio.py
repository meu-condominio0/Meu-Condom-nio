from sqlalchemy import Column, Integer, String, Text, DECIMAL, Enum, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base # Assume que 'Base' é sua classe base do SQLAlchemy

# Importe os modelos necessários para as chaves estrangeiras
from .usuario import Usuario # Assumindo que 'Morador' é mapeado como 'Usuario' ou similar
# Se o morador for mapeado em outro lugar (ex: models/morador.py), importe de lá.


class AnuncioMarketplace(Base):
    __tablename__ = "marketplace" # Mapeia para a tabela SQL existente

    id_anuncio = Column(Integer, primary_key=True, index=True)
    
    # Relação com a tabela de moradores (fk_morador INT NOT NULL)
    fk_morador = Column(Integer, ForeignKey("morador.id_morador"), nullable=False) 
    
    titulo = Column(String(100), nullable=False)
    categoria = Column(Enum('troca', 'venda', 'servico', name='categoria_enum'), nullable=False)
    subcategoria = Column(String(50))
    descricao = Column(Text, nullable=False)
    telefone = Column(String(20))
    whatsapp = Column(String(20))
    valor = Column(DECIMAL(10, 2))
    data_criacao = Column(DateTime, default=datetime.utcnow)
    status = Column(Enum('ativo', 'inativo', name='status_enum'), default='ativo', nullable=False)

    # Opcional: para acessar o morador diretamente do anúncio (relacionamento ORM)
    morador = relationship("Morador") 
    
    # OBS: Se a sua tabela Morador for chamada 'usuario' (baseado no seu nome de arquivo), 
    # ajuste o ForeignKey: ForeignKey("usuario.id_morador").