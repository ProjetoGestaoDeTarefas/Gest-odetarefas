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
    const [task, setTask] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        priority: '',
        members: [],
    });

    const [memberName, setMemberName] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleAddMember = () => {
        if (memberName) {
            setTask((prevTask) => ({
                ...prevTask,
                members: [...prevTask.members, memberName],
            }));
            setMemberName('');
        }
    };

    const handleRemoveMember = (index) => {
        setTask((prevTask) => ({
            ...prevTask,
            members: prevTask.members.filter((_, i) => i !== index),
        }));
    };

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
            <Typography variant="h4" component="h1" gutterBottom style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '80px' }}>
                Edição de Tarefa
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="Novo nome da Tarefa"
                            name="name"
                            value={task.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="Nova Descrição"
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
                        <Typography variant="h6" gutterBottom style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', fontSize: '29px', marginLeft: '140px' }}>
                            Atribuir Tarefa
                        </Typography>
                        <Grid container spacing={2} alignItems="center" width='1000px'>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    label="Atribuir tarefa a um novo membro da equipe"
                                    value={memberName}
                                    onChange={(e) => setMemberName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton color="primary" onClick={handleAddMember}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                            {task.members.map((member, index) => (
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
