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

const Tarefa = () => {
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
        Registro de Tarefa
      </Typography>
      <Box component="form" sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Nome da Tarefa"
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
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              label="Data de Início"
              type="date"
              name="startDate"
              value={task.startDate}
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
              value={task.endDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Prioridade</InputLabel>
              <Select
                name="priority"
                value={task.priority}
                onChange={handleChange}
              >
                <MenuItem value="">Selecione...</MenuItem>
                <MenuItem value="baixa">Baixa</MenuItem>
                <MenuItem value="media">Média</MenuItem>
                <MenuItem value="alta">Alta</MenuItem>
              </Select>
            </FormControl>
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
              Registrar Tarefa
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Tarefa;
