import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Projeto from './Components/Projeto';
import Tarefa from './Components/Tarefa';
import Equipe from './Components/Equipe';
import SignIn from './Components/Signin'
import SignUp from './Components/Signup';
import Updatepass from './Components/Updatepass'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projeto" element={<Projeto />} />
        <Route path="/tarefa" element={<Tarefa />} />
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/sip" exact element={<SignIn />} />
        <Route path="/sup" element={<SignUp />} />
        <Route path="/uppass" element={<Updatepass />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
