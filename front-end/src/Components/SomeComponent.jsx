// Importando React e o hook useNavigate do React Router DOM
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Definição do componente funcional SomeComponent
const SomeComponent = () => {
  // Obtendo a função navigate do hook useNavigate
  const navigate = useNavigate();

  // Função para lidar com o clique no botão de criar usuário
  const handleCreateUser = () => {
    // Navega para a rota '/criar-usuario' quando o botão é clicado
    navigate('/criar-usuario');
  };

  // Renderização do componente
  return (
    <div>
      {/* Botão que chama a função handleCreateUser quando clicado */}
      <button onClick={handleCreateUser}>Criar Usuário</button>
    </div>
  );
};

// Exportando o componente SomeComponent para uso em outros arquivos
export default SomeComponent;
