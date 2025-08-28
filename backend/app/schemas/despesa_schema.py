from pydantic import BaseModel
from datetime import date
from typing import Optional

class DespesaBase(BaseModel):
    data: date
    descricao: str
    valor: float
    local: str
    km: int
    qtd_comb: float

class DespesaCreate(DespesaBase):
    viagem_id: int

class DespesaResponse(DespesaBase):
    id: int
    viagem_id: int

    class Config:
        from_attributes = True  # Pydantic v2

class DespesaUpdate(BaseModel):
    descricao: Optional[str] = None
    valor: Optional[float] = None
    data: Optional[date] = None

    class Config:
        from_attributes = True