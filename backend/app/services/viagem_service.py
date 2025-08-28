from sqlalchemy.orm import Session
from app.schemas.viagem_schema import ViagemCreate, ViagemUpdate
from app.repositories import viagem_repository

def criar_viagem(db: Session, viagem: ViagemCreate):
    # viagem_dict = viagem.dict()
    # viagem_dict["saldo"] = viagem_dict["valor_total"] - viagem_dict["descontos"] - viagem_dict["adiantamento"]
    # ViagemCreate(**viagem_dict)
    return viagem_repository.create_viagem(db, viagem)

def listar_viagens(db: Session):
    return viagem_repository.get_viagens(db)

def buscar_viagem(db: Session, viagem_id: int):
    return viagem_repository.get_viagem_by_id(db, viagem_id)

def editar_viagem(db: Session, viagem_id: int, viagem_update: ViagemUpdate):
    return viagem_repository.update_viagem(db, viagem_id, viagem_update)

def excluir_viagem(db: Session, viagem_id: int):
    return viagem_repository.delete_viagem(db, viagem_id)
