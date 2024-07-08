import React, { useEffect, useState } from 'react';
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

function Home() {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState({
    name: '',
    description: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  const [teamName, setTeamName] = useState('');
  const [memberName, setMemberName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {

    fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
    })
    .then(response => response.json())
    .then(data => setMessage(data.message));

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

const [dados, setDados] = useState([]);

useEffect(() => {
  fetch('/api/projetos')
    .then(response => response.json())
    .then(data => setDados(data));
}, []);

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(data => setMessage(data.message));

    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data.users));
  }, []);

  return (
    <div>
      <div>{message}</div>
      <ul>
        {users.map(user => (
          <li key={user}>{user}</li>
        ))}
        {dados.map(dado => (
        <li key={dado.id}>{dado.name} {dado.descricao}</li> // ajuste de acordo com a estrutura dos seus dados
      ))}
      </ul>
      <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Registro de Projeto
      </Typography>
      <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
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
        </Grid>
      </Box>
    </Container>
    </div>
  );
}

export default Home;