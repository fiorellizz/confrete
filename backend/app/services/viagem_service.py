from sqlalchemy.orm import Session
from app.schemas.viagem_schema import ViagemCreate
from app.repositories import viagem_repository

def criar_viagem(db: Session, viagem: ViagemCreate):
    # Regras de negócio: calcular saldo
    viagem_dict = viagem.dict()
    viagem_dict["saldo"] = viagem_dict["valor_total"] - viagem_dict["descontos"] - viagem_dict["adiantamento"]

    return viagem_repository.create_viagem(db, ViagemCreate(**viagem_dict))

def listar_viagens(db: Session):
    return viagem_repository.get_viagens(db)

def buscar_viagem(db: Session, viagem_id: int):
    return viagem_repository.get_viagem_by_id(db, viagem_id)

def excluir_viagem(db: Session, viagem_id: int):
    return viagem_repository.delete_viagem(db, viagem_id)
