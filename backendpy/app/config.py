import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MYSQL_ROOT_PASSWORD: str | None = None
    MYSQL_DATABASE: str | None = None
    MYSQL_USER: str | None = None
    MYSQL_PASSWORD: str | None = None
    MYSQL_HOST: str = "meu-condominio-db"
    MYSQL_PORT: int = 3306

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

    @property
    def sqlalchemy_database_url(self):
        """
        Gera a URL do banco de dados automaticamente.
        Detecta se o app está rodando em Docker ou local.
        """
        in_docker = os.path.exists("/.dockerenv") or os.getenv("DOCKER_ENV") == "true"
        host = "localhost" if not in_docker else self.MYSQL_HOST

        return (
            f"mysql+pymysql://{self.MYSQL_USER}:{self.MYSQL_PASSWORD}"
            f"@{host}:{self.MYSQL_PORT}/{self.MYSQL_DATABASE}"
        )

# Instância global que carrega o .env automaticamente
settings = Settings()
