from pydantic import BaseModel, Field
from typing import Optional
from decimal import Decimal

# --- Esquema de Entrada (Input) ---
class AnuncioBase(BaseModel):
    titulo: str = Field(..., min_length=5, max_length=100)
    categoria: str = Field(..., pattern="^(troca|venda|servico)$") # Validação básica da categoria
    subcategoria: Optional[str] = Field(None, max_length=50)
    descricao: str = Field(..., min_length=10)
    telefone: Optional[str] = Field(None, max_length=20)
    whatsapp: Optional[str] = Field(None, max_length=20)
    valor: Optional[Decimal] = Field(None, gt=0) # 'gt=0' garante que o valor é maior que zero

    class Config:
        # Permite que o Pydantic lide com objetos ORM
        orm_mode = True 

# Esquema usado para o POST de criação
class AnuncioCreate(AnuncioBase):
    pass
    
# --- Esquema de Saída (Output) ---
class Anuncio(AnuncioBase):
    id_anuncio: int
    fk_morador: int
    status: str
    data_criacao: datetime
    # Opcional: Adicionar o nome do morador, se necessário
    # morador: UsuarioBase