import React, { useState } from 'react';
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

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Registro de Equipe
      </Typography>
      <Box component="form" sx={{ mt: 2 }}>
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
          
         
          
           
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h6" gutterBottom>
              Atribuir Tarefa
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  label="Membro da Equipe"
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
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Registrar EQUIPE
            </Button>
          </Grid>   
        
      </Box>
    </Container>
  );
};




export default Equipe;
