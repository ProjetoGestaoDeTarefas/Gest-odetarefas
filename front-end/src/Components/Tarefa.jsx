import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

const Tarefa = () => {
  // Estado para armazenar os dados da tarefa
  const [task, setTask] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: '',
    members: [],
  });

  // Estado para armazenar o nome do membro a ser adicionado
  const [memberName, setMemberName] = useState('');

  const navigate = useNavigate();

  // Função para lidar com a mudança nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Função para adicionar um membro à lista de membros da tarefa
  const handleAddMember = () => {
    if (memberName) {
      setTask((prevTask) => ({
        ...prevTask,
        members: [...prevTask.members, memberName],
      }));
      setMemberName('');
    }
  };

  // Função para remover um membro da lista de membros da tarefa
  const handleRemoveMember = (index) => {
    setTask((prevTask) => ({
      ...prevTask,
      members: prevTask.members.filter((_, i) => i !== index),
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/tarefa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        navigate('/listaTarefa');
      } else {
        alert('Falha ao registrar a tarefa');
      }
    } catch (error) {
      console.error('Erro ao registrar a tarefa:', error);
      alert('Erro ao registrar a tarefa');
    }
  };

  return (
    <Container maxWidth="md">
      {/* Título da página */}
      <Typography variant="h4" component="h1" gutterBottom style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '80px' }}>
        Registro de Tarefa
      </Typography>
      {/* Formulário de registro de tarefa */}
      <Box component="form" sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {/* Campo de nome da tarefa */}
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
          {/* Campo de descrição da tarefa */}
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
          {/* Campo de data de início da tarefa */}
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
          {/* Campo de data de término da tarefa */}
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
          {/* Campo de prioridade da tarefa */}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Prioridade</InputLabel>
              <Select
                name="priority"
                value={task.priority}
                onChange={handleChange}
              >
                <MenuItem value="">Selecione...</MenuItem>
                <MenuItem value="low">Baixa</MenuItem>
                <MenuItem value="medium">Média</MenuItem>
                <MenuItem value="high">Alta</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Campo para atribuir membros à tarefa */}
          <Grid item xs={10}>
            <Typography variant="h6" gutterBottom style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', fontSize: '29px', marginLeft: '140px' }}>
              Atribuir Tarefa
            </Typography>
            <Grid container spacing={2} alignItems="center" width='1000px'>
              {/* Campo de entrada para nome do membro */}
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  label="Insira um Usuário"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                />
              </Grid>
              {/* Botão para adicionar membro */}
              <Grid item xs={2}>
                <IconButton color="primary" onClick={handleAddMember}>
                  <AddIcon />
                </IconButton>
              </Grid>
              {/* Lista de membros atribuídos à tarefa */}
              {task.members.map((member, index) => (
                <Grid key={index} item xs={12}>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1">{member}</Typography>
                    {/* Botão para remover membro */}
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
          {/* Botão para enviar o formulário de registro de tarefa */}
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '2px' }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Registrar Tarefa
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Tarefa;
