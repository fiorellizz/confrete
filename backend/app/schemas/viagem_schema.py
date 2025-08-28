from pydantic import BaseModel
from datetime import date
from typing import List, Optional
from app.schemas.despesa_schema import DespesaResponse

class ViagemBase(BaseModel):
    data: date
    origem: str
    destino: str
    mercadoria: str
    peso: float
    valor_por_ton: float
    valor_total: float
    descontos: float = 0.0
    adiantamento: float = 0.0
    saldo: float

class ViagemCreate(ViagemBase):
    pass

class ViagemResponse(ViagemBase):
    id: int
    despesas: Optional[List[DespesaResponse]] = []  # relacionamento

    class Config:
        from_attributes = True

class ViagemUpdate(BaseModel):
    data: Optional[date] = None
    peso: Optional[float] = None
    valor_por_ton: Optional[float] = None
    valor_total: Optional[float] = None
    descontos: Optional[float] = None
    adiantamento: Optional[float] = None
    saldo: Optional[float] = None
    
    class Config:
        from_attributes = True