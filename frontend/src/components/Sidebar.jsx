import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, LogOut, Menu, X } from 'lucide-react';
import '../App.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleExportData = () => {
    console.log('Solicitação de exportação de dados.');
    alert('Funcionalidade de exportação de dados será implementada via API.');
  };

  return (
    <>
      {/* Hamburger menu for mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-800 bg-white rounded-md shadow-md">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar for desktop and mobile overlay */}
      <div
        className={`fixed md:static inset-y-0 left-0 w-64 bg-gray-800 text-white flex flex-col p-4 z-40
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          transition-transform duration-300 ease-in-out`}
      >
        <div className="text-2xl font-bold mb-8">Trucker App</div>
        <nav className="flex-1">
          <ul>
            <li className="mb-4">
              <Link to="/viagens" className="flex items-center p-2 rounded-md hover:bg-gray-700" onClick={() => setIsOpen(false)}>
                <FileText className="mr-3" size={20} />
                Viagens
              </Link>
            </li>
            <li className="mb-4">
              <button
                onClick={() => { handleExportData(); setIsOpen(false); }}
                className="flex items-center p-2 rounded-md hover:bg-gray-700 w-full text-left"
              >
                <FileText className="mr-3" size={20} />
                Exportar Dados
              </button>
            </li>
          </ul>
        </nav>
        <div className="mt-auto">
          <Link to="/" className="flex items-center p-2 rounded-md hover:bg-gray-700" onClick={() => setIsOpen(false)}>
            <LogOut className="mr-3" size={20} />
            Sair
          </Link>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;


