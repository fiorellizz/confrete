from fastapi import FastAPI
from app.config.database import Base, engine
from app.controllers import viagem_controller, despesa_controller

# Criar tabelas
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Controle de Viagens")

# Rotas
app.include_router(viagem_controller.router)
app.include_router(despesa_controller.router)