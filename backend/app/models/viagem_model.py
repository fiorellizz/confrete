from sqlalchemy import Column, Integer, String, Float, Date
from sqlalchemy.orm import relationship
from app.config.database import Base

class Viagem(Base):
    __tablename__ = "viagens"

    id = Column(Integer, primary_key=True, index=True)
    data = Column(Date, nullable=False)
    origem = Column(String(100), nullable=False)
    destino = Column(String(100), nullable=False)
    mercadoria = Column(String(100), nullable=False)
    peso = Column(Float, nullable=False)
    valor_por_ton = Column(Float, nullable=False)
    valor_total = Column(Float, nullable=False)
    descontos = Column(Float, default=0.0)
    adiantamento = Column(Float, default=0.0)
    saldo = Column(Float, nullable=False)

    # Relacionamento
    despesas = relationship("Despesa", back_populates="viagem", cascade="all, delete-orphan")
