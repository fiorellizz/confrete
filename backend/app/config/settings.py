from pydantic_settings import BaseSettings  # 👈 em vez de from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Controle de Viagens"
    DATABASE_URL: str = "sqlite:///./viagens.db"  # padrão para dev

    class Config:
        env_file = ".env"

settings = Settings()
