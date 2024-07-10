import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Projeto from './Components/Projeto';
import Tarefa from './Components/Tarefa';
import Equipe from './Components/Equipe';
import ListaTarefa from './Components/ListaTarefa';
import ListaProjeto from './Components/ListaProjeto';
import './Style/StyleGlobal.css';
import JivoChatWidget from './Components/Jivochat';
//import GoogleCalendar from './Components/Googlecalen';
import io from 'socket.io-client';
const socket = io('http://localhost:5173');

const App = () => {
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
  return (
    <div id="root">
      <BrowserRouter>
        <Navbar notifications={notifications} emails={emails} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projeto" element={<Projeto />} />
            <Route path="/tarefa" element={<Tarefa />} />
            <Route path="/equipe" element={<Equipe />} />
            <Route path="/listaTarefa" element={<ListaTarefa />} />
            <Route path="/listaProjeto" element={<ListaProjeto />} />
          </Routes>
          <JivoChatWidget />
          {/* <GoogleCalendar /> */}
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
