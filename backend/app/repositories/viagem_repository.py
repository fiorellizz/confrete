from sqlalchemy.orm import Session
from app.models.viagem_model import Viagem
from app.schemas.viagem_schema import ViagemCreate

def create_viagem(db: Session, viagem: ViagemCreate):
    db_viagem = Viagem(**viagem.dict())
    db.add(db_viagem)
    db.commit()
    db.refresh(db_viagem)
    return db_viagem

def get_viagens(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Viagem).offset(skip).limit(limit).all()

def get_viagem_by_id(db: Session, viagem_id: int):
    return db.query(Viagem).filter(Viagem.id == viagem_id).first()

def delete_viagem(db: Session, viagem_id: int):
    viagem = get_viagem_by_id(db, viagem_id)
    if viagem:
        db.delete(viagem)
        db.commit()
    return viagem
