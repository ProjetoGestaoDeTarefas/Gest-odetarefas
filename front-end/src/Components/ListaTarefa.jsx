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
} from '@mui/material';

const ListaTarefa = () => {
  const [tarefas, setTarefas] = useState([]);
  const [search, setSearch] = useState('');

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

  const filteredTarefas = tarefas.filter(tarefa =>
    tarefa.descricao.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" component="h1" gutterBottom>
        Listagem de Tarefas
      </Typography>

      <form className="d-flex mb-3" onSubmit={(e) => e.preventDefault()}>
        <TextField
          className="me-2"
          variant="outlined"
          type="text"
          name="search"
          placeholder="Pesquisa..."
          value={search}
          onChange={handleSearchChange}
          style={{ width: '50%'}} 
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchChange} 
          style={{ minWidth: '130px' }} 
        >
          <i className="fas fa-search me-1"></i> Pesquisar
        </Button>
      </form>

      {/* Tabela de Tarefas */}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data de Início</TableCell>
              <TableCell>Data de Término</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Excluir</TableCell>
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
                  <a href={`tarefa/update/${row.id}`} className="text-success ml-2">
                    <i className="fas fa-edit fa-lg mx-1"></i>
                  </a>
                </TableCell>
                <TableCell>
                  <a href={`tarefa/delete/${row.id}`} className="text-danger ml-2">
                    <i className="fas fa-trash-alt fa-lg mx-1"></i>
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListaTarefa;
