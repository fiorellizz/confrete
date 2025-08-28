import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Viagens from './pages/Viagens';
import DetalhesViagem from './pages/DetalhesViagem';
import Sidebar from './components/Sidebar';
import './App.css';

const AppContent = () => {
  const location = useLocation();
  const showSidebar = location.pathname !== '/';

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {showSidebar && <Sidebar />}
      <main className={`flex-1 ${showSidebar ? 'md:ml-0' : ''} p-4 md:p-8 pt-16 md:pt-8`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/viagens" element={<Viagens />} />
          <Route path="/viagens/:id" element={<DetalhesViagem />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;


