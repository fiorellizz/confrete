from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.config.database import get_db
from app.schemas.despesa_schema import DespesaCreate, DespesaResponse
from app.services import despesa_service

router = APIRouter(prefix="/despesas", tags=["Despesas"])

@router.post("/", response_model=DespesaResponse)
def criar_despesa(despesa: DespesaCreate, db: Session = Depends(get_db)):
    return despesa_service.criar_despesa(db, despesa)

@router.get("/viagem/{viagem_id}", response_model=List[DespesaResponse])
def listar_despesas(viagem_id: int, db: Session = Depends(get_db)):
    return despesa_service.listar_despesas_por_viagem(db, viagem_id)

@router.get("/{despesa_id}", response_model=DespesaResponse)
def buscar_despesa(despesa_id: int, db: Session = Depends(get_db)):
    despesa = despesa_service.buscar_despesa(db, despesa_id)
    if not despesa:
        raise HTTPException(status_code=404, detail="Despesa não encontrada")
    return despesa

@router.delete("/{despesa_id}")
def excluir_despesa(despesa_id: int, db: Session = Depends(get_db)):
    despesa = despesa_service.excluir_despesa(db, despesa_id)
    if not despesa:
        raise HTTPException(status_code=404, detail="Despesa não encontrada")
    return {"msg": "Despesa excluída com sucesso"}
