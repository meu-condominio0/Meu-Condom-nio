from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from ..database import get_db
from ..models.usuario import Usuario
from ..schemas.usuario import UsuarioLogin, TokenResponse, UsuarioResponse
from .security import verificar_senha
from .auth_token import criar_token_acesso, verificar_token


router = APIRouter(prefix="/auth", tags=["Autenticação"])
oauth2 = OAuth2PasswordBearer(tokenUrl="/auth/login")


# --------------------------
#   /auth/login
# --------------------------
@router.post("/login", response_model=TokenResponse)
def login(dados: UsuarioLogin, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.email == dados.email).first()

    if not usuario:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    if usuario.status != "ativo":
        raise HTTPException(status_code=403, detail="Usuário inativo/bloqueado")

    if not verificar_senha(dados.senha, usuario.senha_hash):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    # Gera token contendo id, email, tipo
    token = criar_token_acesso({
        "sub": str(usuario.id),
        "email": usuario.email,
        "tipo": usuario.tipo,
    })

    user_response = UsuarioResponse(
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
        observacoes=usuario.observacoes,
    )

    return TokenResponse(
        access_token=token,
        usuario=user_response
    )


# --------------------------
#   /auth/me
# --------------------------
@router.get("/me", response_model=UsuarioResponse)
def me(token: str = Depends(oauth2), db: Session = Depends(get_db)):
    dados = verificar_token(token)

    usuario = db.query(Usuario).filter(Usuario.id == dados["sub"]).first()
    if not usuario:
        raise HTTPException(status_code=401, detail="Usuário não encontrado")

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
        observacoes=usuario.observacoes,
    )
