from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import datetime
from ..models.visitante import TipoVisitante, StatusVisita


# -------------------------------------------------
# Função de validação de CPF
# -------------------------------------------------
def validar_cpf(cpf: str) -> bool:
    """Valida o CPF (somente números, 11 dígitos e dígitos verificadores)."""
    cpf = ''.join(filter(str.isdigit, cpf))
    if len(cpf) != 11 or cpf == cpf[0] * 11:
        return False

    soma = sum(int(cpf[i]) * (10 - i) for i in range(9))
    dig1 = ((soma * 10) % 11) % 10

    soma = sum(int(cpf[i]) * (11 - i) for i in range(10))
    dig2 = ((soma * 10) % 11) % 10

    return dig1 == int(cpf[9]) and dig2 == int(cpf[10])


# -------------------------------------------------
# Schemas principais
# -------------------------------------------------
class VisitanteBase(BaseModel):
    nome: str
    tipo: TipoVisitante
    cpf: Optional[str] = None
    telefone: Optional[str] = None
    apartamento: str
    preAutorizado: Optional[bool] = False
    recorrente: Optional[bool] = False

    @field_validator("cpf")
    @classmethod
    def validar_cpf_field(cls, v: Optional[str]) -> Optional[str]:
        if not v:
            return v  # campo é opcional

        v = ''.join(filter(str.isdigit, v))

        if len(v) != 11:
            raise ValueError("CPF deve conter 11 dígitos.")

        if not validar_cpf(v):
            raise ValueError("CPF inválido. Verifique e tente novamente.")

        return v


class VisitanteCreate(VisitanteBase):
    pass


class VisitanteUpdateStatus(BaseModel):
    status: StatusVisita


class Visitante(VisitanteBase):
    id: str
    status: StatusVisita
    dataHora: datetime
    entrada: Optional[datetime] = None
    saida: Optional[datetime] = None
    observacao: Optional[str] = None

    class Config:
        from_attributes = True


class VisitanteFinalizar(BaseModel):
    observacao: Optional[str] = None
