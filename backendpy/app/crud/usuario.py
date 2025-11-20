from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from fastapi import HTTPException
import re
import secrets
import random
import string

from ..core.security import gerar_hash_senha
from ..core.email_service import enviar_email  # ✔ IMPORT CORRETO

from ..models.usuario import Usuario
from ..schemas.usuario import UsuarioCreate, TipoUsuario, StatusUsuario, UsuarioResponse


# ================================================================
# 🔧 Funções utilitárias
# ================================================================
def gerar_senha_temporaria(tamanho=8):
    caracteres = string.ascii_letters + string.digits
    return ''.join(random.choice(caracteres) for _ in range(tamanho))


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


# ================================================================
# 👤 Criação de novo usuário
# ================================================================
def create_usuario(db: Session, usuario: UsuarioCreate, created_by: int):
    # 🧩 Valida CPF
    cpf_limpo = re.sub(r'\D', '', usuario.cpf)
    if len(cpf_limpo) != 11:
        raise HTTPException(status_code=422, detail="CPF inválido")

    # 🔍 Verifica duplicidade
    if db.query(Usuario).filter(Usuario.cpf == usuario.cpf).first():
        raise HTTPException(status_code=400, detail="CPF já cadastrado")

    if db.query(Usuario).filter(Usuario.email == usuario.email).first():
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    # 🔐 Gera senha temporária
    senha_temp = gerar_senha_temporaria()

    db_usuario = Usuario(
        nome=usuario.nome,
        email=usuario.email,
        cpf=usuario.cpf,
        telefone=usuario.telefone,
        apartamento=usuario.apartamento,
        bloco=usuario.bloco,
        tipo=usuario.tipo,
        status='ativo',
        senha_hash=gerar_hash_senha(senha_temp),
        data_ultimo_acesso=None,
        observacoes=usuario.observacoes,
        created_by=created_by
    )

    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)

    # 📧 Envia e-mail ao usuário
    try:
        mensagem = f"""
        <h2>Bem-vindo ao Meu Condomínio!</h2>
        <p>Olá <b>{db_usuario.nome}</b>,</p>
        <p>Sua conta foi criada com sucesso.</p>
        <p>Sua senha temporária é:</p>
        <h3>{senha_temp}</h3>
        <p>Recomendamos alterar a senha após o primeiro login.</p>
        """
        enviar_email(db_usuario.email, "Sua conta foi criada - MeuCondomínio", mensagem)
    except Exception as e:
        print("❌ Erro ao enviar e-mail de boas-vindas:", e)

    return db_usuario


# ================================================================
# 📄 Listagem de usuários
# ================================================================
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


# ================================================================
# 🔄 Atualizar status
# ================================================================
def update_usuario_status(db: Session, usuario_id: int, status: StatusUsuario):
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    usuario.status = status
    db.commit()
    db.refresh(usuario)
    return usuario


# ================================================================
# 🗑 Excluir usuário
# ================================================================
def delete_usuario(db: Session, usuario_id: int):
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    db.delete(usuario)
    db.commit()
    return True


# ================================================================
# 🔐 Redefinir senha
# ================================================================
def redefinir_senha(db: Session, usuario_id: int):
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    # 1. Gerar nova senha
    nova_senha = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(10))

    # 2. Atualizar hash
    usuario.senha_hash = gerar_hash_senha(nova_senha)
    db.commit()
    db.refresh(usuario)

    # 3. Construir mensagem HTML
    mensagem = f"""
<div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

    <h2 style="color: #2ECC71; text-align: center; margin-bottom: 10px;">
      Sua senha foi redefinida 🔒
    </h2>

    <p style="font-size: 16px; color: #444;">Olá <b>{usuario.nome}</b>! Seja bem vindo(a) a nossa Plataforma de Gestão</p>

    <p style="font-size: 16px; color: #444;">
      Uma nova senha foi gerada para a sua conta no <b>MeuCondomínio</b>.
    </p>

    <div style="
      background: #2ECC71;
      color: #fff;
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      padding: 12px 0;
      border-radius: 8px;
      margin: 20px 0;
    ">
      {nova_senha}
    </div>

    <p style="font-size: 15px; color: #555;">
      Recomendamos que você altere essa senha após seu primeiro login.
    </p>

    <a href="https://seusite.com/login"
       style="
        display: block;
        width: 100%;
        text-align: center;
        background: #27AE60;
        color: #fff;
        padding: 14px;
        font-size: 16px;
        border-radius: 8px;
        margin-top: 15px;
        text-decoration: none;
        font-weight: bold;
       ">
      Acessar o Sistema
    </a>

    <p style="margin-top: 30px; font-size: 13px; color: #999; text-align: center;">
      Caso não tenha solicitado esta redefinição, ignore este e-mail.
    </p>

  </div>
</div>
"""

    # 4. Enviar e-mail
    try:
        enviar_email(usuario.email, "Nova senha de acesso - MeuCondomínio", mensagem)
    except Exception as e:
        print("❌ Erro ao enviar e-mail:", e)
        return {"message": "Senha redefinida, mas ocorreu um erro ao enviar o e-mail."}

    return {"message": "Senha redefinida e enviada por e-mail com sucesso!"}


# ================================================================
# ✏ Atualização de dados
# ================================================================
def update_usuario_info(db: Session, usuario_id: int, usuario_update):
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    novos_dados = usuario_update.dict(exclude_unset=True)

    # Validação de CPF
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

    # Validação de e-mail
    if "email" in novos_dados and novos_dados["email"]:
        duplicado_email = (
            db.query(Usuario)
            .filter(Usuario.email == novos_dados["email"], Usuario.id != usuario_id)
            .first()
        )
        if duplicado_email:
            raise HTTPException(status_code=400, detail="E-mail já cadastrado para outro usuário")

    # Atualizar campos
    for campo, valor in novos_dados.items():
        setattr(usuario, campo, valor)

    db.commit()
    db.refresh(usuario)

    return usuario
