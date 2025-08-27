from sqlalchemy.orm import Session
from app.models.despesa_model import Despesa
from app.schemas.despesa_schema import DespesaCreate

def create_despesa(db: Session, despesa: DespesaCreate):
    db_despesa = Despesa(**despesa.dict())
    db.add(db_despesa)
    db.commit()
    db.refresh(db_despesa)
    return db_despesa

def get_despesas_by_viagem(db: Session, viagem_id: int):
    return db.query(Despesa).filter(Despesa.viagem_id == viagem_id).all()

def get_despesa_by_id(db: Session, despesa_id: int):
    return db.query(Despesa).filter(Despesa.id == despesa_id).first()

def delete_despesa(db: Session, despesa_id: int):
    despesa = get_despesa_by_id(db, despesa_id)
    if despesa:
        db.delete(despesa)
        db.commit()
    return despesa
