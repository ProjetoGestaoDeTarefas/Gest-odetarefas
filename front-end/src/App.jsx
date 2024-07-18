import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Cabecalho'; // Importa o componente Navbar
import Footer from './Components/Rodape'; // Importa o componente Footer
import Home from './Components/PaginaInicial'; // Importa o componente Home
import Projeto from './Components/Projeto'; // Importa o componente Projeto
import Tarefa from './Components/Tarefa'; // Importa o componente Tarefa
import Equipe from './Components/Equipe'; // Importa o componente Equipe
import ListaTarefa from './Components/ListaTarefa'; // Importa o componente ListaTarefa
import ListaProjeto from './Components/ListaProjeto'; // Importa o componente ListaProjeto
import CriarUsuario from './Components/CriarUsuario'; // Importa o componente CriarUsuario
import JivoChatWidget from './Components/Jivochat'; // Importa o componente JivoChatWidget
import io from 'socket.io-client'; // Importa o cliente socket.io para comunicação em tempo real
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; // Importa o estilo CSS do MDB React UI Kit

const socket = io('http://localhost:5173'); // Inicializa o socket.io-client para se conectar ao servidor WebSocket

const App = () => {
  const [notifications, setNotifications] = useState(0); // Estado para contar notificações
  const [emails, setEmails] = useState(0); // Estado para contar e-mails

  useEffect(() => {
    // Efeito para escutar eventos 'notification' e 'email' do servidor WebSocket
    socket.on('notification', (data) => {
      setNotifications((prev) => prev + 1); // Incrementa o contador de notificações
      console.log(data.message); // Exibe a mensagem recebida no console
    });

    socket.on('email', (data) => {
      setEmails((prev) => prev + 1); // Incrementa o contador de e-mails
      console.log(data.message); // Exibe a mensagem recebida no console
    });

    return () => {
      // Limpa os listeners quando o componente é desmontado
      socket.off('notification');
      socket.off('email');
    };
  }, []); // Array vazio como dependência para garantir que o efeito seja executado apenas uma vez

  return (
    <Router>
      {/* Renderiza o componente Navbar passando as contagens de notificações e e-mails */}
      <Navbar notifications={notifications} emails={emails} />

      {/* Conteúdo principal da aplicação */}
      <div className="main-content">
        <Routes>
          {/* Define as rotas da aplicação com os respectivos componentes */}
          <Route path="/home" element={<Home />} />
          <Route path="/projeto" element={<Projeto />} />
          <Route path="/tarefa" element={<Tarefa />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/listaTarefa" element={<ListaTarefa />} />
          <Route path="/listaProjeto" element={<ListaProjeto />} />
          <Route path="/criar-usuario" element={<CriarUsuario />} />

          {/* Rota inicial que redireciona para /home */}
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </div>

      {/* Renderiza o componente JivoChatWidget */}
      <JivoChatWidget />

      {/* Renderiza o componente Footer */}
      <Footer />
    </Router>
  );
};

export default App;
