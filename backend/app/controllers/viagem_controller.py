from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.config.database import get_db
from app.schemas.viagem_schema import ViagemCreate, ViagemUpdate, ViagemResponse
from app.services import viagem_service

router = APIRouter(prefix="/viagens", tags=["Viagens"])

@router.post("/", response_model=ViagemResponse)
def criar_viagem(viagem: ViagemCreate, db: Session = Depends(get_db)):
    return viagem_service.criar_viagem(db, viagem)

@router.get("/", response_model=List[ViagemResponse])
def listar_viagens(db: Session = Depends(get_db)):
    return viagem_service.listar_viagens(db)

@router.get("/{viagem_id}", response_model=ViagemResponse)
def buscar_viagem(viagem_id: int, db: Session = Depends(get_db)):
    viagem = viagem_service.buscar_viagem(db, viagem_id)
    if not viagem:
        raise HTTPException(status_code=404, detail="Viagem não encontrada")
    return viagem

@router.patch("/{viagem_id}")
def update_viagem_controller(viagem_id: int, viagem_update: ViagemUpdate, db: Session = Depends(get_db)):
    viagem = viagem_service.editar_viagem(db, viagem_id, viagem_update)
    if not viagem:
        raise HTTPException(status_code=404, detail="Viagem não encontrada")
    return viagem

@router.delete("/{viagem_id}")
def excluir_viagem(viagem_id: int, db: Session = Depends(get_db)):
    viagem = viagem_service.excluir_viagem(db, viagem_id)
    if not viagem:
        raise HTTPException(status_code=404, detail="Viagem não encontrada")
    return {"msg": "Viagem excluída com sucesso"}
