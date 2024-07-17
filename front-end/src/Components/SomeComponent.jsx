// src/Components/SomeComponent.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SomeComponent = () => {
  const navigate = useNavigate();

  const handleCreateUser = () => {
    navigate('/criar-usuario');
  };

  return (
    <div>
      <button onClick={handleCreateUser}>Criar Usuário</button>
    </div>
  );
};

export default SomeComponent;
