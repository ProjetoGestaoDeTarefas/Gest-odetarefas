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

const ListaProjeto = () => {
  const [projetos, setProjetos] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response = await fetch('/api/projeto');
        if (response.ok) {
          const data = await response.json();
          setProjetos(data);
        } else {
          console.error('Erro ao buscar projetos:', response.status);
        }
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    };

    fetchProjetos();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredProjetos = projetos.filter(projeto =>
    projeto.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" component="h1" gutterBottom>
        Listagem de Projetos
      </Typography>

      {/* Barra de Pesquisa */}
      <form className="d-flex mb-3" onSubmit={(e) => e.preventDefault()}>
        <TextField
          className="me-2"
          variant="outlined"
          type="text"
          name="search"
          placeholder="Pesquisa..."
          value={search}
          onChange={handleSearchChange}
          style={{ width: '50%' }}
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

      {/* Tabela de Projetos */}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nome do Projeto</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data de Início</TableCell>
              <TableCell>Data de Término</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjetos.map((row) => (
              <TableRow key={row.id} className="align-middle">
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.descricao}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.dataInicio}</TableCell>
                <TableCell>{row.dataFim}</TableCell>
                <TableCell>
                  <a href={`projeto/update/${row.id}`} className="text-success ml-2">
                    <i className="fas fa-edit fa-lg mx-1"></i>
                  </a>
                </TableCell>
                <TableCell>
                  <a href={`projeto/delete/${row.id}`} className="text-danger ml-2">
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

export default ListaProjeto;
