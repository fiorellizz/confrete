import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

function DetalhesViagem() {
  const { id } = useParams();
  const [viagem, setViagem] = useState(null);
  const [despesas, setDespesas] = useState([]);
  const [novaDespesa, setNovaDespesa] = useState({
    descricao: '',
    valor: '',
    data: '',
  });
  const [editingDespesaId, setEditingDespesaId] = useState(null);

  useEffect(() => {
    // Simulação de chamada de API para buscar detalhes da viagem e despesas
    const fetchDetalhesViagem = async () => {
      try {
        // const viagemResponse = await fetch(`/api/viagens/${id}`);
        // const viagemData = await viagemResponse.json();
        const viagemData = { id: parseInt(id), origem: 'São Paulo', destino: 'Rio de Janeiro', dataInicio: '2023-01-01', dataFim: '2023-01-02' };
        setViagem(viagemData);

        // const despesasResponse = await fetch(`/api/viagens/${id}/despesas`);
        // const despesasData = await despesasResponse.json();
        const despesasData = [
          { id: 1, descricao: 'Combustível', valor: 500.00, data: '2023-01-01' },
          { id: 2, descricao: 'Pedágio', valor: 50.00, data: '2023-01-01' },
        ];
        setDespesas(despesasData);
      } catch (error) {
        console.error('Erro ao buscar detalhes da viagem:', error);
      }
    };
    fetchDetalhesViagem();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaDespesa({ ...novaDespesa, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingDespesaId) {
      // Lógica para editar despesa
      try {
        // const response = await fetch(`/api/viagens/${id}/despesas/${editingDespesaId}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(novaDespesa),
        // });
        // const updatedDespesa = await response.json();
        const updatedDespesa = { id: editingDespesaId, ...novaDespesa };
        setDespesas(despesas.map(d => (d.id === editingDespesaId ? updatedDespesa : d)));
        setEditingDespesaId(null);
      } catch (error) {
        console.error('Erro ao editar despesa:', error);
      }
    } else {
      // Lógica para criar nova despesa
      try {
        // const response = await fetch(`/api/viagens/${id}/despesas`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(novaDespesa),
        // });
        // const data = await response.json();
        const data = { id: despesas.length + 1, ...novaDespesa };
        setDespesas([...despesas, data]);
      } catch (error) {
        console.error('Erro ao adicionar despesa:', error);
      }
    }
    setNovaDespesa({ descricao: '', valor: '', data: '' });
  };

  const handleEdit = (despesa) => {
    setEditingDespesaId(despesa.id);
    setNovaDespesa({ ...despesa });
  };

  const handleDelete = async (despesaId) => {
    if (window.confirm('Tem certeza que deseja excluir esta despesa?')) {
      try {
        // await fetch(`/api/viagens/${id}/despesas/${despesaId}`, { method: 'DELETE' });
        setDespesas(despesas.filter(d => d.id !== despesaId));
      } catch (error) {
        console.error('Erro ao excluir despesa:', error);
      }
    }
  };

  if (!viagem) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Carregando...</div>;
  }

  return (
    <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Detalhes da Viagem: {viagem.origem} para {viagem.destino}</h2>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl md:text-2xl font-bold mb-4">{editingDespesaId ? 'Editar Despesa' : 'Adicionar Nova Despesa'}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="descricao"
            placeholder="Descrição"
            value={novaDespesa.descricao}
            onChange={handleInputChange}
            className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
          <input
            type="number"
            name="valor"
            placeholder="Valor"
            value={novaDespesa.valor}
            onChange={handleInputChange}
            className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            step="0.01"
            required
          />
          <input
            type="date"
            name="data"
            placeholder="Data"
            value={novaDespesa.data}
            onChange={handleInputChange}
            className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
          <button
            type="submit"
            className="col-span-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-900 transition duration-200"
          >
            {editingDespesaId ? 'Salvar Edição' : 'Adicionar Despesa'}
          </button>
          {editingDespesaId && (
            <button
              type="button"
              onClick={() => {
                setEditingDespesaId(null);
                setNovaDespesa({ descricao: '', valor: '', data: '' });
              }}
              className="col-span-full px-6 py-3 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-200 mt-2"
            >
              Cancelar Edição
            </button>
          )}
        </form>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-xl md:text-2xl font-bold mb-4">Despesas da Viagem</h3>
        {despesas.length === 0 ? (
          <p>Nenhuma despesa cadastrada para esta viagem ainda.</p>
        ) : (
          <ul className="space-y-4">
            {despesas.map((despesa) => (
              <li
                key={despesa.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-md bg-gray-50"
              >
                <div className="mb-2 md:mb-0">
                  <p className="font-semibold">{despesa.descricao}</p>
                  <p className="text-sm text-gray-600">R$ {despesa.valor.toFixed(2)} - {despesa.data}</p>
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                  <button
                    onClick={() => handleEdit(despesa)}
                    className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition duration-200 w-full md:w-auto"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(despesa.id)}
                    className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200 w-full md:w-auto"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default DetalhesViagem;


