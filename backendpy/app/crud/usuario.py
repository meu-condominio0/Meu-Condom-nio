from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from fastapi import HTTPException
from datetime import datetime, date
import re

from ..models.usuario import Usuario
from ..schemas.usuario import UsuarioCreate, TipoUsuario, StatusUsuario, UsuarioResponse


def usuario_to_response(usuario: Usuario) -> UsuarioResponse:
    return UsuarioResponse(
        id=usuario.id,
        nome=usuario.nome,
        email=usuario.email,
        cpf=usuario.cpf,
        telefone=usuario.telefone,
        apartamento=usuario.apartamento,
        bloco=usuario.bloco,
        tipo=usuario.tipo,
        status=usuario.status,
        dataUltimoAcesso=usuario.data_ultimo_acesso,
        dataCadastro=usuario.data_cadastro,
        observacoes=usuario.observacoes
    )


def create_usuario(db: Session, usuario: UsuarioCreate, created_by: int):
    # 🧩 Valida CPF antes de cadastrar
    cpf_limpo = re.sub(r'\D', '', usuario.cpf)
    if len(cpf_limpo) != 11:
        raise HTTPException(status_code=422, detail="CPF deve conter 11 dígitos válidos")

    # ✅ Verifica duplicidade de CPF e Email
    if db.query(Usuario).filter(Usuario.cpf == usuario.cpf).first():
        raise HTTPException(status_code=400, detail="CPF já cadastrado")

    if db.query(Usuario).filter(Usuario.email == usuario.email).first():
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    db_usuario = Usuario(
        nome=usuario.nome,
        email=usuario.email,
        cpf=usuario.cpf,
        telefone=usuario.telefone,
        apartamento=usuario.apartamento,
        bloco=usuario.bloco,
        tipo=usuario.tipo,
        status='ativo',
        data_ultimo_acesso=None,
        observacoes=usuario.observacoes,
        created_by=created_by
    )

    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario


def get_usuarios(db: Session, skip: int = 0, limit: int = 100, search: str = None, tipo: TipoUsuario = None, status: StatusUsuario = None):
    query = db.query(Usuario)
    if search:
        query = query.filter(
            or_(
                func.lower(Usuario.nome).contains(search.lower()),
                func.lower(Usuario.email).contains(search.lower()),
                Usuario.apartamento.contains(search),
                func.lower(Usuario.bloco).contains(search.lower()),
                Usuario.cpf.contains(search)
            )
        )
    if tipo:
        query = query.filter(Usuario.tipo == tipo)
    if status:
        query = query.filter(Usuario.status == status)
    return query.offset(skip).limit(limit).all()


def update_usuario_status(db: Session, usuario_id: int, status: StatusUsuario):
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    usuario.status = status
    db.commit()
    db.refresh(usuario)
    return usuario


def delete_usuario(db: Session, usuario_id: int):
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    db.delete(usuario)
    db.commit()
    return True


def redefinir_senha(db: Session, usuario_id: int):
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    usuario.data_ultimo_acesso = date.today()
    db.commit()
    return {"message": "Senha redefinida e enviada por email (simulado)"}


# 🆕 =======================================================
# ✅ Função: atualizar informações do usuário
# =======================================================
def update_usuario_info(db: Session, usuario_id: int, usuario_update):
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    # 🔹 Converte Pydantic -> dict
    novos_dados = usuario_update.dict(exclude_unset=True)

    # 🧩 Validação de CPF (se enviado)
    if "cpf" in novos_dados and novos_dados["cpf"]:
        cpf_limpo = re.sub(r'\D', '', novos_dados["cpf"])
        if len(cpf_limpo) != 11:
            raise HTTPException(status_code=422, detail="CPF deve conter 11 dígitos válidos")
        duplicado_cpf = (
            db.query(Usuario)
            .filter(Usuario.cpf == novos_dados["cpf"], Usuario.id != usuario_id)
            .first()
        )
        if duplicado_cpf:
            raise HTTPException(status_code=400, detail="CPF já cadastrado para outro usuário")

    # 🧩 Validação de email (se enviado)
    if "email" in novos_dados and novos_dados["email"]:
        duplicado_email = (
            db.query(Usuario)
            .filter(Usuario.email == novos_dados["email"], Usuario.id != usuario_id)
            .first()
        )
        if duplicado_email:
            raise HTTPException(status_code=400, detail="E-mail já cadastrado para outro usuário")

    # 🔄 Atualiza apenas os campos informados
    for campo, valor in novos_dados.items():
        setattr(usuario, campo, valor)

    # 🔹 Persiste no banco
    db.commit()
    db.refresh(usuario)

    return usuario

