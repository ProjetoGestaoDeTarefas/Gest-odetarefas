import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';

// Componente Grouped para exibir e selecionar equipes
function Grouped({ onAddTeam }) {
  const [options, setOptions] = useState([]);

  // Carrega as opções de equipes ao montar o componente
  useEffect(() => {
    fetch('/api/equipes')
      .then(response => response.json())
      .then(data => {
        // Formata os dados das equipes para exibição
        const formattedData = data.map(equipe => ({
          firstLetter: equipe.name[0].toUpperCase(),
          ...equipe
        }));
        setOptions(formattedData); // Atualiza as opções de equipes no estado
      })
      .catch(error => console.error('Erro ao buscar equipes:', error));
  }, []);

  return (
    <Grid item xs={12} sx={{ width: '100%' }}>
      {/* Componente Autocomplete para seleção de equipe */}
      <Autocomplete
        id="grouped-demo"
        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.name}
        fullWidth
        onChange={(event, newValue) => {
          if (newValue) {
            onAddTeam(newValue); // Adiciona a equipe selecionada ao projeto
          }
        }}
        renderInput={(params) => <TextField {...params} label="Equipes" />}
      />
    </Grid>
  );
}

// Componente principal para registro de projetos
function Projeto() {
  const navigate = useNavigate();

  const [project, setProject] = useState({
    name: '',
    description: '',
    status: '',
    startDate: '',
    endDate: '',
    teams: [],
  });

  const [message, setMessage] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/api/projeto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then(response => response.json())
      .then(data => {
        setMessage(data.message); // Exibe mensagem de sucesso
        navigate('/listaProjeto'); // Redireciona para a lista de projetos
      })
      .catch(error => console.error('Erro ao registrar projeto:', error));
  };

  // Função para atualizar o estado do projeto conforme o usuário digita nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  // Função para adicionar uma equipe selecionada ao projeto
  const handleAddTeam = (team) => {
    setProject((prevProject) => ({
      ...prevProject,
      teams: [...prevProject.teams, team],
    }));
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom style={{ marginTop: '80px' }}>
          Registro de Projeto
        </Typography>
        <Box component="form" sx={{ mt: 1, width: '100%' }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* Campo de texto para o nome do projeto */}
              <TextField
                fullWidth
                required
                label="Nome do Projeto"
                name="name"
                value={project.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              {/* Campo de texto para a descrição do projeto */}
              <TextField
                fullWidth
                required
                label="Descrição"
                name="description"
                value={project.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              {/* Seleção do status do projeto */}
              <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={project.status} onChange={handleChange}>
                  <MenuItem value="Not Started">Não Iniciado</MenuItem>
                  <MenuItem value="In Progress">Em Progresso</MenuItem>
                  <MenuItem value="Completed">Concluído</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              {/* Campo de data de início do projeto */}
              <TextField
                fullWidth
                required
                label="Data de Início"
                type="date"
                name="startDate"
                value={project.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              {/* Campo de data de término do projeto */}
              <TextField
                fullWidth
                required
                label="Data de Término"
                type="date"
                name="endDate"
                value={project.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            {/* Componente Grouped para selecionar equipes */}
            <Grouped onAddTeam={handleAddTeam} />
            <Grid item xs={12} display="flex" justifyContent="center">
              {/* Botão para submeter o formulário de registro */}
              <Button variant="contained" color="primary" type="submit">
                Registrar Projeto
              </Button>
            </Grid>
          </Grid>
        </Box>
        {/* Exibe mensagem de sucesso após o registro */}
        {message && (
          <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default Projeto;
