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

function Grouped({ onAddTeam }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch('/api/equipes')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(equipe => ({
          firstLetter: equipe.name[0].toUpperCase(),
          ...equipe
        }));
        setOptions(formattedData);
      })
      .catch(error => console.error('Erro ao buscar equipes:', error));
  }, []);

  return (
    <Grid item xs={12} sx={{ width: '100%' }}>
      <Autocomplete
        id="grouped-demo"
        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.name}
        fullWidth
        onChange={(event, newValue) => {
          if (newValue) {
            onAddTeam(newValue);
          }
        }}
        renderInput={(params) => <TextField {...params} label="Equipes" />}
      />
    </Grid>
  );
}

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
        setMessage(data.message);
        navigate('/listaProjetos');
      })
      .catch(error => console.error('Erro ao registrar projeto:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleAddTeam = (team) => {
    setProject((prevProject) => ({
      ...prevProject,
      teams: [...prevProject.teams, team],
    }));
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Registro de Projeto
        </Typography>
        <Box component="form" sx={{ mt: 8, width: '100%' }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            <Grouped onAddTeam={handleAddTeam} />
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button variant="contained" color="primary" type="submit">
                Registrar Projeto
              </Button>
            </Grid>
          </Grid>
        </Box>
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
