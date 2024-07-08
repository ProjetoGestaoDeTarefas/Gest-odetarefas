import React, { useState } from 'react';
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
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Projeto = () => {
  const [project, setProject] = useState({
    name: '',
    description: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState('');
  const [teamName, setTeamName] = useState('');
  const [memberName, setMemberName] = useState('');
  
  
  
  
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
    .then(data => setMessage(data.message));
};



  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleAddTeam = () => {
    if (teamName) {
      setTeams((prevTeams) => [...prevTeams, teamName]);
      setTeamName('');
    }
  };

  const handleAddMember = () => {
    if (memberName) {
      setMembers((prevMembers) => [...prevMembers, memberName]);
      setMemberName('');
    }
  };

  const handleRemoveTeam = (index) => {
    setTeams((prevTeams) => prevTeams.filter((_, i) => i !== index));
  };

  const handleRemoveMember = (index) => {
    setMembers((prevMembers) => prevMembers.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Registro de Projeto
      </Typography>
      <Box component="form" sx={{ mt: 2 }}>
        <Grid container spacing={2} >
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
              <Select
                name="status"
                value={project.status}
                onChange={handleChange}
              >
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
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Equipes
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  label="Nome da Equipe"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton color="primary" onClick={handleAddTeam}>
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Box mt={2}>
              {teams.map((team, index) => (
                <Box key={index} display="flex" alignItems="center" mb={1}>
                  <Typography variant="body1">{team}</Typography>
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveTeam(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              {members.map((member, index) => (
                <Box key={index} display="flex" alignItems="center" mb={1}>
                  <Typography variant="body1">{member}</Typography>
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveMember(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Registrar Projeto
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Projeto;
