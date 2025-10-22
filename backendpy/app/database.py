from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings  # importa nossa classe Settings

# Agora pegamos a URL dinâmica (que detecta se é local ou Docker)
SQLALCHEMY_DATABASE_URL = settings.sqlalchemy_database_url

# Criação do engine de conexão com o MySQL
engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)

# Configuração da sessão
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base do SQLAlchemy – todos os models herdam dessa base
Base = declarative_base()

# Dependência para obter uma sessão de banco de dados por requisição
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
