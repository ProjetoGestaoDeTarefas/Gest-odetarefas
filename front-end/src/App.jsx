import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Projeto from './Components/Projeto';
import Tarefa from './Components/Tarefa';
import Equipe from './Components/Equipe';
import ListaTarefa from './Components/ListaTarefa';
import ListaProjeto from './Components/ListaProjeto';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projeto" element={<Projeto />} />
        <Route path="/tarefa" element={<Tarefa />} />
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/listaTarefa" element={<ListaTarefa />} />
        <Route path="/listaProjeto" element={<ListaProjeto />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
