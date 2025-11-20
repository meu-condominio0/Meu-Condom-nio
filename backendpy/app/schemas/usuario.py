from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime
from typing import Optional
from enum import Enum as PyEnum

# ---------------------------------------
# ENUMS
# ---------------------------------------
class TipoUsuario(str, PyEnum):
    morador = "morador"
    sindico = "sindico"
    subsindico = "subsindico"


class StatusUsuario(str, PyEnum):
    ativo = "ativo"
    inativo = "inativo"
    bloqueado = "bloqueado"

    # ---------------------------------------
# LOGIN
# ---------------------------------------
class UsuarioLogin(BaseModel):
    email: EmailStr
    senha: str



# ---------------------------------------
# FUNÇÃO DE VALIDAÇÃO DE CPF
# ---------------------------------------
def validar_cpf(cpf: str) -> str:
    if not cpf:
        return cpf

    cpf = cpf.replace(".", "").replace("-", "")

    if not cpf.isdigit() or len(cpf) != 11:
        raise ValueError("CPF deve conter 11 dígitos.")

    if cpf == cpf[0] * 11:
        raise ValueError("CPF inválido. Verifique e tente novamente.")

    soma = sum(int(cpf[i]) * (10 - i) for i in range(9))
    resto = (soma * 10) % 11
    if resto == 10:
        resto = 0
    if resto != int(cpf[9]):
        raise ValueError("CPF inválido. Verifique e tente novamente.")

    soma = sum(int(cpf[i]) * (11 - i) for i in range(10))
    resto = (soma * 10) % 11
    if resto == 10:
        resto = 0
    if resto != int(cpf[10]):
        raise ValueError("CPF inválido. Verifique e tente novamente.")

    return cpf


# ---------------------------------------
# SCHEMAS BASE
# ---------------------------------------
class UsuarioBase(BaseModel):
    nome: str
    email: EmailStr
    cpf: str
    telefone: Optional[str] = None
    apartamento: str
    bloco: str
    tipo: TipoUsuario = TipoUsuario.morador
    observacoes: Optional[str] = None

    @field_validator("cpf")
    def validar_cpf_field(cls, v):
        return validar_cpf(v)


# ---------------------------------------
# CRIAÇÃO
# ---------------------------------------
class UsuarioCreate(UsuarioBase):
    pass

# ---------------------------------------
# ATUALIZAÇÃO
# ---------------------------------------
class UsuarioUpdate(BaseModel):
    nome: Optional[str] = None
    email: Optional[EmailStr] = None
    apartamento: Optional[str] = None
    bloco: Optional[str] = None
    tipo: Optional[TipoUsuario] = None
    status: Optional[StatusUsuario] = None
    telefone: Optional[str] = None
    observacoes: Optional[str] = None

    model_config = {"from_attributes": True}


# ---------------------------------------
# RESPOSTA DO USUÁRIO
# ---------------------------------------
class UsuarioResponse(BaseModel):
    id: int
    nome: str
    email: EmailStr
    cpf: str
    telefone: Optional[str]
    apartamento: str
    bloco: str
    tipo: TipoUsuario
    status: StatusUsuario
    dataUltimoAcesso: Optional[datetime]
    dataCadastro: datetime
    observacoes: Optional[str]

    model_config = {"from_attributes": True}


# ---------------------------------------
# TOKEN RESPONSE (DEVE FICAR APÓS UsuarioResponse)
# ---------------------------------------
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    usuario: UsuarioResponse

    model_config = {"from_attributes": True}
