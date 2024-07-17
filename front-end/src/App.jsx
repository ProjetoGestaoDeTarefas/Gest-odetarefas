import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Projeto from './Components/Projeto';
import Tarefa from './Components/Tarefa';
import Equipe from './Components/Equipe';
import ListaTarefa from './Components/ListaTarefa';
import ListaProjeto from './Components/ListaProjeto';
//import CriarUsuario from './Components/CriarUsuario';
//import Login from './Components/login'; 
//import RedefinirSenha from './Components/RedefinirSenha'; 
import JivoChatWidget from './Components/Jivochat';
import io from 'socket.io-client';

//import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const socket = io('http://localhost:5173');

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const [emails, setEmails] = useState(0);

  useEffect(() => {
    socket.on('notification', (data) => {
      setNotifications((prev) => prev + 1);
      console.log(data.message);
    });

    socket.on('email', (data) => {
      setEmails((prev) => prev + 1);
      console.log(data.message);
    });

    return () => {
      socket.off('notification');
      socket.off('email');
    };
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
          <>
            <Navbar notifications={notifications} emails={emails} />
            <div className="main-content">
              <Route path="/" element={<Home />} />
              <Route path="/projeto" element={<Projeto />} />
              <Route path="/tarefa" element={<Tarefa />} />
              <Route path="/equipe" element={<Equipe />} />
              <Route path="/listaTarefa" element={<ListaTarefa />} />
              <Route path="/listaProjeto" element={<ListaProjeto />} />
            </div>
            <JivoChatWidget />
            <Footer />
          </>
      </Routes>
    </Router>
  );
};

export default App;
