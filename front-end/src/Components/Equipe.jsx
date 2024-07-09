import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Equipe = () => {
  const [task, setTask] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: '',
  });

  const [members, setMembers] = useState([]);
  const [memberName, setMemberName] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleAddMember = () => {
    if (memberName) {
      setMembers((prevMembers) => [...prevMembers, memberName]);
      setMemberName('');
    }
  };

  const handleRemoveMember = (index) => {
    setMembers((prevMembers) => prevMembers.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const teamCreate = {
      ...task,
      members,
    };
    fetch('/api/team', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamCreate),
    })
      .then(response => response.json())
      .then(data => setMessage(data.message));
  };

  const handleSendInvites = () => {
    fetch('/api/send-invites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ members }),
    })
      .then(response => response.json())
      .then(data => setMessage(data.message));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Registro de Equipe
      </Typography>
      <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Nome da equipe"
              name="name"
              value={task.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Descrição"
              name="description"
              value={task.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Adicionar Membro
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  label="Coloque o email do membro"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton color="primary" onClick={handleAddMember}>
                  <AddIcon />
                </IconButton>
              </Grid>
              {members.map((member, index) => (
                <Grid key={index} item xs={12}>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1">{member}</Typography>
                    <IconButton
                      color="secondary"
                      onClick={() => handleRemoveMember(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button variant="contained" color="primary" type="submit" style={{ marginRight: '10px' }}>
              Registrar EQUIPE
            </Button>
            <Button variant="contained" color="secondary" onClick={handleSendInvites}>
              Enviar Convites
            </Button>
          </Grid>
        </Grid>
      </Box>
      {message && <Typography variant="body1" color="success">{message}</Typography>}
    </Container>
  );
};

export default Equipe;
