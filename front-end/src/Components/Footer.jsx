import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      position: 'fixed',  // Fixa o footer na tela
      bottom: 0,
      width: '100%',
      textAlign: 'center',
      backgroundColor: '#1976d2',
      padding: '10px 0',
    }}>
      <p>© 2024 Grupo 1. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;
