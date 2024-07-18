import React from 'react';
import { Container, Typography, Card, CardContent, CssBaseline } from '@mui/material';
import vid from '../assets/vid/Design sem nome (2).mp4'; // Importa o vídeo a ser exibido

const HomePage = () => {
  return (
    <React.Fragment>
      <CssBaseline /> {/* Normaliza o estilo do CSS */}
      <Container maxWidth="xl" style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
        {/* Título principal */}
        <Typography variant="h3" component="h1" gutterBottom style={{ fontFamily: 'Arial, sans-serif' }}>
          Sistema de Gestão de Tarefas para Equipes
        </Typography>
        {/* Descrição do sistema */}
        <Typography variant="body1" gutterBottom style={{ fontFamily: 'Arial, sans-serif' }}>
          Bem-vindo ao sistema de gestão de tarefas para equipes. Aqui você pode gerenciar projetos,
          atribuir tarefas aos membros da equipe, acompanhar o progresso e muito mais.
        </Typography>
        <Typography variant="body1" style={{ fontFamily: 'Arial, sans-serif' }}>
          Este sistema oferece diversas funcionalidades para facilitar a colaboração e organização
          dentro da sua equipe de desenvolvimento.
        </Typography>

        {/* Card para exibir o vídeo */}
        <Card style={{ marginTop: '20px', height: 'auto', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          <CardContent>
            <iframe
              width="100%"
              height="400px"
              src={vid} // URL do vídeo importado
              title="Vídeo de Introdução" // Título do vídeo para acessibilidade
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" // Permissões do iframe
              allowFullScreen // Permite o vídeo ser exibido em tela cheia
            ></iframe>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
}

export default HomePage;
