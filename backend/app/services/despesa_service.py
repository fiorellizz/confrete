from sqlalchemy.orm import Session
from app.schemas.despesa_schema import DespesaCreate, DespesaUpdate
from app.repositories import despesa_repository

def criar_despesa(db: Session, despesa: DespesaCreate):
    return despesa_repository.create_despesa(db, despesa)

def listar_despesas_por_viagem(db: Session, viagem_id: int):
    return despesa_repository.get_despesas_by_viagem(db, viagem_id)

def buscar_despesa(db: Session, despesa_id: int):
    return despesa_repository.get_despesa_by_id(db, despesa_id)

def editar_despesa(db: Session, despesa_id: int, despesa_update: DespesaUpdate):
    return despesa_repository.update_despesa(db, despesa_id, despesa_update)

def excluir_despesa(db: Session, despesa_id: int):
    return despesa_repository.delete_despesa(db, despesa_id)
