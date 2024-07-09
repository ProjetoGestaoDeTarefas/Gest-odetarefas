import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useNavigate } from 'react-router-dom';

const ListaTarefa = () => {
  const [tarefas, setTarefas] = useState([]);
  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [projetos, setProjetos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await fetch('/api/projeto');
        if (!response.ok) {
          throw new Error('Erro ao buscar tarefas');
        }
        const data = await response.json();
        setTarefas(data);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    fetchTarefas();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredTarefas = tarefas.filter((tarefa) =>
    tarefa.descricao.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenDialog = (action, taskId) => {
    setCurrentAction(action);
    setCurrentTaskId(taskId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentAction('');
    setCurrentTaskId(null);
  };

  const handleEditarProjeto = (id) => {
    // Navega para a página de edição do projeto com o ID fornecido
    navigate(`/projeto/update/${id}`);
  };

  const handleExcluirProjeto = async (id) => {
    try {
      // Lógica para excluir o projeto com o ID fornecido
      const response = await fetch(`/api/projeto/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir projeto');
      }
      // Atualiza a lista de projetos após a exclusão
      setProjetos(projetos.filter((projeto) => projeto.id !== id));
      console.log(`Projeto com ID ${id} excluído com sucesso`);
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
    }
  };

  const handleArquivarProjeto = async (id) => {
    try {
      // Lógica para arquivar o projeto com o ID fornecido
      const response = await fetch(`/api/projeto/archive/${id}`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error('Erro ao arquivar projeto');
      }
      // Atualiza a lista de projetos após arquivamento
      setProjetos(projetos.map((projeto) => 
        projeto.id === id ? { ...projeto, arquivado: true } : projeto
      ));
      console.log(`Projeto com ID ${id} arquivado com sucesso`);
    } catch (error) {
      console.error('Erro ao arquivar projeto:', error);
    }
  };

  const handleConfirmAction = async () => {
    if (currentAction === 'delete') {
      await handleExcluirProjeto(currentTaskId);
    } else if (currentAction === 'archive') {
      await handleArquivarProjeto(currentTaskId);
    }
    handleCloseDialog();
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" component="h1" gutterBottom>
        Listagem de Tarefas
      </Typography>

      <Grid container spacing={1} alignItems="center">
        <Grid item xs={7}>
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            name="search"
            placeholder="Pesquisa..."
            value={search}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Button fullWidth variant="contained" color="primary">
            Pesquisar
          </Button>
        </Grid>
      </Grid>

      {/* Tabela de Tarefas */}
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Data de Início</TableCell>
              <TableCell>Data de Término</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Deletar</TableCell>
              <TableCell>Arquivar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTarefas.map((row) => (
              <TableRow key={row.id} className="align-middle">
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.descricao}</TableCell>
                <TableCell>{row.start_date}</TableCell>
                <TableCell>{row.end_date}</TableCell>
                <TableCell>
                  <IconButton aria-label="Editar" onClick={() => handleEditarProjeto(row.id)}>
                    <CreateIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton aria-label="Excluir" onClick={() => handleOpenDialog('delete', row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton aria-label="Arquivar" onClick={() => handleOpenDialog('archive', row.id)}>
                    <ArchiveIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar Ação</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {currentAction === 'delete' && 'Tem certeza que deseja excluir esta tarefa?'}
            {currentAction === 'archive' && 'Tem certeza que deseja arquivar esta tarefa?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmAction} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ListaTarefa;
