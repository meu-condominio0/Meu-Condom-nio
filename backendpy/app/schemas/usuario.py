from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional
from enum import Enum as PyEnum

class TipoUsuario(str, PyEnum):
      morador = "morador"
      sindico = "sindico"
      subsindico = "subsindico"

class StatusUsuario(str, PyEnum):
      ativo = "ativo"
      inativo = "inativo"
      bloqueado = "bloqueado"

class UsuarioCreate(BaseModel):  # Para POST (cadastro)
      nome: str
      email: EmailStr
      telefone: Optional[str] = None
      apartamento: str
      bloco: str
      tipo: TipoUsuario = "morador"
      observacoes: Optional[str] = None
      # status e datas setados no backend

      model_config = {"from_attributes": True}

class UsuarioUpdate(BaseModel):  # Para PUT (ex.: atualizar status)
      status: Optional[StatusUsuario] = None

      model_config = {"from_attributes": True}

class UsuarioResponse(BaseModel):  # Para GET/POST responses
      id: int
      nome: str
      email: EmailStr
      telefone: Optional[str]
      apartamento: str
      bloco: str
      tipo: TipoUsuario
      status: StatusUsuario
      dataUltimoAcesso: str
      dataCadastro: str
      observacoes: Optional[str]

      model_config = {"from_attributes": True}
 