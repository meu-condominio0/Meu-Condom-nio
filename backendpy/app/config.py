import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # ----------------------------------------
    # BANCO DE DADOS
    # ----------------------------------------
    MYSQL_ROOT_PASSWORD: str | None = None
    MYSQL_DATABASE: str | None = None
    MYSQL_USER: str | None = None
    MYSQL_PASSWORD: str | None = None
    MYSQL_HOST: str = "meu-condominio-db"
    MYSQL_PORT: int = 3306

    # ----------------------------------------
    # JWT / AUTENTICAÇÃO
    # ----------------------------------------
    SECRET_KEY: str = "MUDE-ISSO-PARA-UM-SEGREDO-BEM-GRANDE"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # ----------------------------------------
    # EMAIL
    # ----------------------------------------
    EMAIL_HOST: str | None = None
    EMAIL_PORT: int | None = None
    EMAIL_USER: str | None = None
    EMAIL_PASS: str | None = None

    class Config:
        # Se estiver no Docker, usa .env.docker
        if os.getenv("DOCKER_ENV") == "true" or os.path.exists("/.dockerenv"):
            env_file = ".env.docker"
        else:
            env_file = ".env"

        env_file_encoding = "utf-8"
        extra = "allow"

    # ----------------------------------------
    # FUNÇÃO PARA GERAR A URL DO BANCO
    # ----------------------------------------
    @property
    def sqlalchemy_database_url(self):
        in_docker = os.path.exists("/.dockerenv") or os.getenv("DOCKER_ENV") == "true"
        host = "localhost" if not in_docker else self.MYSQL_HOST

        return (
            f"mysql+pymysql://{self.MYSQL_USER}:{self.MYSQL_PASSWORD}"
            f"@{host}:{self.MYSQL_PORT}/{self.MYSQL_DATABASE}"
        )


settings = Settings()
