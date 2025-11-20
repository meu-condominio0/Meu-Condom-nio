# app/core/security.py
from passlib.context import CryptContext

# 🔐 Usando ARGON2 (funciona no Windows e Python 3.12)
pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto"
)

def gerar_hash_senha(senha: str) -> str:
    """
    Recebe uma senha em texto puro e devolve o hash seguro.
    """
    return pwd_context.hash(senha)

def verificar_senha(senha: str, senha_hash: str) -> bool:
    """
    Verifica se a senha fornecida corresponde ao hash salvo no banco.
    """
    return pwd_context.verify(senha, senha_hash)
