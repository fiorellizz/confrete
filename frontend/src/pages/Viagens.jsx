import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Viagens() {
  const [viagens, setViagens] = useState([]);
  const [novaViagem, setNovaViagem] = useState({
    origem: '',
    destino: '',
    dataInicio: '',
    dataFim: '',
  });
  const [editingViagemId, setEditingViagemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulação de chamada de API para buscar viagens
    const fetchViagens = async () => {
      try {
        // const response = await fetch('/api/viagens');
        // const data = await response.json();
        const data = [
          { id: 1, origem: 'São Paulo', destino: 'Rio de Janeiro', dataInicio: '2023-01-01', dataFim: '2023-01-02' },
          { id: 2, origem: 'Belo Horizonte', destino: 'Brasília', dataInicio: '2023-01-05', dataFim: '2023-01-06' },
        ];
        setViagens(data);
      } catch (error) {
        console.error('Erro ao buscar viagens:', error);
      }
    };
    fetchViagens();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaViagem({ ...novaViagem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingViagemId) {
      // Lógica para editar viagem
      try {
        // const response = await fetch(`/api/viagens/${editingViagemId}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(novaViagem),
        // });
        // const updatedViagem = await response.json();
        const updatedViagem = { id: editingViagemId, ...novaViagem };
        setViagens(viagens.map(v => (v.id === editingViagemId ? updatedViagem : v)));
        setEditingViagemId(null);
      } catch (error) {
        console.error('Erro ao editar viagem:', error);
      }
    } else {
      // Lógica para criar nova viagem
      try {
        // const response = await fetch('/api/viagens', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(novaViagem),
        // });
        // const data = await response.json();
        const data = { id: viagens.length + 1, ...novaViagem };
        setViagens([...viagens, data]);
      } catch (error) {
        console.error('Erro ao criar viagem:', error);
      }
    }
    setNovaViagem({ origem: '', destino: '', dataInicio: '', dataFim: '' });
  };

  const handleEdit = (viagem, event) => {
    event.stopPropagation();
    setEditingViagemId(viagem.id);
    setNovaViagem({ ...viagem });
  };

  const handleDelete = async (id, event) => {
    event.stopPropagation(); // Evita que o clique propague para o card da viagem
    if (window.confirm('Tem certeza que deseja excluir esta viagem?')) {
      try {
        // await fetch(`/api/viagens/${id}`, { method: 'DELETE' });
        setViagens(viagens.filter(v => v.id !== id));
      } catch (error) {
        console.error('Erro ao excluir viagem:', error);
      }
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/viagens/${id}`);
  };

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Minhas Viagens</h2>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl md:text-2xl font-bold mb-4">{editingViagemId ? 'Editar Viagem' : 'Criar Nova Viagem'}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="origem"
            placeholder="Origem"
            value={novaViagem.origem}
            onChange={handleInputChange}
            className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
          <input
            type="text"
            name="destino"
            placeholder="Destino"
            value={novaViagem.destino}
            onChange={handleInputChange}
            className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
          <input
            type="date"
            name="dataInicio"
            placeholder="Data de Início"
            value={novaViagem.dataInicio}
            onChange={handleInputChange}
            className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
          <input
            type="date"
            name="dataFim"
            placeholder="Data de Fim"
            value={novaViagem.dataFim}
            onChange={handleInputChange}
            className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
          <button
            type="submit"
            className="col-span-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-900 transition duration-200"
          >
            {editingViagemId ? 'Salvar Edição' : 'Adicionar Viagem'}
          </button>
          {editingViagemId && (
            <button
              type="button"
              onClick={() => {
                setEditingViagemId(null);
                setNovaViagem({ origem: '', destino: '', dataInicio: '', dataFim: '' });
              }}
              className="col-span-full px-6 py-3 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-200 mt-2"
            >
              Cancelar Edição
            </button>
          )}
        </form>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-xl md:text-2xl font-bold mb-4">Viagens Cadastradas</h3>
        {viagens.length === 0 ? (
          <p>Nenhuma viagem cadastrada ainda.</p>
        ) : (
          <ul className="space-y-4">
            {viagens.map((viagem) => (
              <li
                key={viagem.id}
                onClick={() => handleViewDetails(viagem.id)} // Adicionado onClick para o card
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-md bg-gray-50 hover:bg-gray-100 transition duration-200 cursor-pointer" // Adicionado cursor-pointer
              >
                <div className="mb-2 md:mb-0">
                  <p className="font-semibold text-lg">{viagem.origem} para {viagem.destino}</p>
                  <p className="text-sm text-gray-600">{viagem.dataInicio} a {viagem.dataFim}</p>
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                  <button
                    onClick={(e) => handleEdit(viagem, e)}
                    className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition duration-200 w-full md:w-auto"
                  >
                    Editar
                  </button>
                  <button
                    onClick={(e) => handleDelete(viagem.id, e)} // Passando o evento para stopPropagation
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
    </>
  );
}

export default Viagens;


