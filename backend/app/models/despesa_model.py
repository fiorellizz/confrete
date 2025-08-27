from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.config.database import Base

class Despesa(Base):
    __tablename__ = "despesas"

    id = Column(Integer, primary_key=True, index=True)
    data = Column(Date, nullable=False)
    descricao = Column(String(150), nullable=False)
    valor = Column(Float, nullable=False)
    local = Column(String(50), nullable=False)
    km = Column(Integer, default=0)
    qtd_comb = Column(Float, nullable=False)

    viagem_id = Column(Integer, ForeignKey("viagens.id"))
    viagem = relationship("Viagem", back_populates="despesas")
