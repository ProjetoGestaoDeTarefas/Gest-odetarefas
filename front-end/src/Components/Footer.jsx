import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      textAlign: 'center',
      backgroundColor: '#1976d2',
      padding: '10px 0',
      margin: 0, 
      zIndex: 1000,
    }}>
      <p style={{ color: 'white', margin: 0 }}>© 2024 Grupo 1. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;
