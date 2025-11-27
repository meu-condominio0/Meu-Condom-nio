from sqlalchemy.orm import Session
from .database import SessionLocal
from .models.usuario import Usuario
from .core.security import gerar_hash_senha


def criar_sindico_padrao():
    db: Session = SessionLocal()

    email_padrao = "sindico@condominio.com"

    # Verificar se já existe
    existente = db.query(Usuario).filter(Usuario.email == email_padrao).first()
    if existente:
        db.close()
        return

    print("🟢 Criando usuário síndico padrão...")

    novo = Usuario(
        nome="Síndico Padrão",
        email=email_padrao,
        cpf="00000000000",
        telefone="(00) 00000-0000",
        apartamento="ADM",
        bloco="0",
        tipo="sindico",
        senha_hash=gerar_hash_senha("sindico123"),  # 🔥 SENHA PADRÃO SEGURA
        status="ativo",
        observacoes="Usuário gerado automaticamente pelo sistema"
    )

    db.add(novo)
    db.commit()
    db.close()

    print("✅ Síndico padrão criado com sucesso!")
