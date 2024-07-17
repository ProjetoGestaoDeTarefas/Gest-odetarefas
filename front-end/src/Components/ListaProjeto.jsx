import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from 'react-router-dom';

const ListaProjeto = () => {
  const [projetos, setProjetos] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response = await fetch('/api/projeto');
        if (!response.ok) {
          throw new Error('Projetos não encotrados!');
        }
        const data = await response.json();
        setProjetos(data);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    };

    fetchProjetos();
  }, []);

  const handlePesquisaChange = (e) => {
    setPesquisa(e.target.value);
  };

  const projetosFiltrados = projetos.filter(projeto =>
    projeto.name.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const handleEditarProjeto = (id) => {
    navigate(`/projeto/update/${id}`);
  };

  const handleExcluirProjeto = async (id) => {
    try {
      const response = await fetch(`/api/projeto/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir projeto');
      }
      setProjetos(projetos.filter(projeto => projeto.id !== id));
      console.log(`Projeto com ID ${id} excluído com sucesso`);
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" component="h1" gutterBottom>
        Listagem de Projetos
      </Typography>

      <form className="d-flex mb-2 ml-4" onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          variant="outlined"
          type="text"
          name="pesquisa"
          placeholder="Pesquisa..."
          value={pesquisa}
          onChange={handlePesquisaChange}
          style={{ flexGrow: 1, marginRight: '10px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handlePesquisaChange}
          style={{ minWidth: '150px' }}
        >
          <i className="fas fa-search me-1" style={{ marginRight: '8px' }}></i> Pesquisar
        </Button>
      </form>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nome do Projeto</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Data de Início</TableCell>
              <TableCell>Data de Término</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projetosFiltrados.map((row) => (
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
                  <IconButton aria-label="Excluir" onClick={() => handleExcluirProjeto(row.id)}>
                    <DeleteIcon />
                  </IconButton>
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
