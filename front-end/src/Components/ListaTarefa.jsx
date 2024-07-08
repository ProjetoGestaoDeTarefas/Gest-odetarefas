import React, { useEffect, useState } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';

const ListaTarefa = () => {
  const [tarefas, setTarefas] = useState([]);
  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await fetch('/api/tarefa');
        if (response.ok) {
          const data = await response.json();
          setTarefas(data);
        } else {
          console.error('Erro ao buscar tarefas:', response.status);
        }
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

  const handleConfirmAction = async () => {
    if (!currentTaskId || !currentAction) return;

    try {
      const response = await fetch(`/api/tarefa/${currentTaskId}`, {
        method: currentAction === 'delete' ? 'DELETE' : 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: currentAction === 'archive' ? JSON.stringify({ status: 'Archived' }) : null,
      });

      if (response.ok) {
        setTarefas((prevTarefas) =>
          prevTarefas.filter((tarefa) => tarefa.id !== currentTaskId)
        );
      } else {
        console.error('Erro ao realizar ação:', response.status);
      }
    } catch (error) {
      console.error('Erro ao realizar ação:', error);
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSearchChange}
          >
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
              <TableCell>Descrição</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data de Início</TableCell>
              <TableCell>Data de Término</TableCell>
              <TableCell>Ações</TableCell>
              <TableCell>Arquivar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTarefas.map((row) => (
              <TableRow key={row.id} className="align-middle">
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.descricao}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.dataCadastro}</TableCell>
                <TableCell>{row.dataFinalizado}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => window.location.href = `tarefa/update/${row.id}`}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleOpenDialog('delete', row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="default"
                    onClick={() => handleOpenDialog('archive', row.id)}
                  >
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
