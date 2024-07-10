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

      {/* Barra de Pesquisa */}
      <form className="d-flex mb-2 ml-4" onSubmit={(e) => e.preventDefault()}>
        <TextField
          className="me-2"
          variant="outlined"
          type="text"
          name="pesquisa"
          placeholder="Pesquisa..."
          value={pesquisa}
          onChange={handlePesquisaChange}
          style={{ width: '50%',marginBottom:'30px',marginTop:'10px'  }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handlePesquisaChange}
          style={{ minWidth: '241px',marginLeft:'10px',marginTop:'20px'}}
        >
          <i className="fas fa-search me-1"
          style={{marginLeft:'8px',justifyContent: 'space-around',display:'block'}}></i> Pesquisar
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
