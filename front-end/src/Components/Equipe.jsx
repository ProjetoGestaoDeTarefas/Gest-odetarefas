import { useState, useEffect } from 'react'; // Importa useState e useEffect do React
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  IconButton,
} from '@mui/material'; // Importa componentes do Material-UI
import AddIcon from '@mui/icons-material/Add'; // Importa ícone de adicionar
import DeleteIcon from '@mui/icons-material/Delete'; // Importa ícone de deletar

const Equipe = () => {
  // Define o estado inicial para a tarefa
  const [task, setTask] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: '',
  });

  const [memberEmails, setMemberEmails] = useState(['']); // Estado para armazenar emails dos membros
  const [message, setMessage] = useState(''); // Estado para mensagens
  const [validEmails, setValidEmails] = useState([]); // Estado para emails válidos

  useEffect(() => {
    // Simulando a obtenção de emails válidos do banco de dados
    fetch('/api/valid-emails')
      .then(response => response.json())
      .then(data => setValidEmails(data.emails)); // Supondo que 'emails' é um array de emails válidos
  }, []);

  // Manipula alterações nos campos de entrada da tarefa
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Adiciona um novo campo de email para membros
  const handleAddMember = () => {
    setMemberEmails([...memberEmails, '']);
  };

  // Remove um campo de email de membro
  const handleRemoveMember = (index) => {
    setMemberEmails((prevMemberEmails) => prevMemberEmails.filter((_, i) => i !== index));
  };

  // Manipula alterações nos campos de email dos membros
  const handleMemberEmailChange = (index, value) => {
    const updatedMemberEmails = [...memberEmails];
    updatedMemberEmails[index] = value;
    setMemberEmails(updatedMemberEmails);
  };

  // Manipula o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    const teamCreate = {
      ...task,
      members: memberEmails.filter(email => email.trim() !== ''), // Filtra emails vazios
    };
    fetch('/api/equipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamCreate),
    })
      .then(response => response.json())
      .then(data => setMessage(data.message)); // Define a mensagem recebida da API
  };

  // Envia convites aos membros
  const handleSendInvites = () => {
    fetch('/api/send-invites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ members: memberEmails }),
    })
      .then(response => response.json())
      .then(data => setMessage(data.message)); // Define a mensagem recebida da API
  };

  // Verifica se um email é válido
  const isValidEmail = (email) => {
    return validEmails.includes(email);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '80px' }}>
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
              InputLabelProps={{
                shrink: true,
              }}
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
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Typography variant="h6" gutterBottom style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', fontSize: '25px' }}>
              Adicionar Membros
            </Typography>
            {memberEmails.map((email, index) => (
              <Grid key={index} item xs={12}>
                <Box display="flex" alignItems="center" style={{ marginBottom: '10px' }}>
                  <TextField
                    fullWidth
                    required
                    label="Coloque o email do membro"
                    value={email}
                    onChange={(e) => handleMemberEmailChange(index, e.target.value)}
                    style={{ marginRight: '10px', flex: 1 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {(index === memberEmails.length - 1 || isValidEmail(email)) && (
                    <IconButton color="primary" onClick={handleAddMember}>
                      <AddIcon />
                    </IconButton>
                  )}
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
