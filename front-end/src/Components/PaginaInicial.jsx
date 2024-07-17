import React from 'react';
import { Container, Typography, Card, CardContent, CssBaseline } from '@mui/material';
import vid from '../assets/vid/Design sem nome (2).mp4';

const HomePage = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" style={{ textAlign: 'center', marginTop: '50px', overflowY: 'auto', height: '100vh', padding: '20px' }}>
        <Typography variant="h3" component="h1" gutterBottom style={{ fontFamily: 'Arial, sans-serif' }}>
          Sistema de Gestão de Tarefas para Equipes
        </Typography>
        <Typography variant="body1" gutterBottom style={{ fontFamily: 'Arial, sans-serif' }}>
          Bem-vindo ao sistema de gestão de tarefas para equipes. Aqui você pode gerenciar projetos,
          atribuir tarefas aos membros da equipe, acompanhar o progresso e muito mais.
        </Typography>
        <Typography variant="body1" style={{ fontFamily: 'Arial, sans-serif' }}>
          Este sistema oferece diversas funcionalidades para facilitar a colaboração e organização
          dentro da sua equipe de desenvolvimento.
        </Typography>
        
  
        <Card style={{ marginTop: '20px', height: 'auto', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          <CardContent>
            <iframe
              width="100%"
              height="400px"
              src={vid}
              title="Vídeo de Introdução"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
}

export default HomePage;
