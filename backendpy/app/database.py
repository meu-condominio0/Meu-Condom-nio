from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Carrega o arquivo .env (para ter a DATABASE_URL)
load_dotenv()


SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

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
