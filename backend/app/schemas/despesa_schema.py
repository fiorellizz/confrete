from pydantic import BaseModel
from datetime import date

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
