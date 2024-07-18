import { useEffect, useState } from 'react'; // Importa useEffect e useState do React
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
} from '@mui/material'; // Importa componentes do Material-UI
import DeleteIcon from '@mui/icons-material/Delete'; // Importa ícone de deletar
import CreateIcon from '@mui/icons-material/Create'; // Importa ícone de editar
import { useNavigate } from 'react-router-dom'; // Importa hook de navegação do React Router

const ListaProjeto = () => {
  const [projetos, setProjetos] = useState([]); // Estado para armazenar a lista de projetos
  const [pesquisa, setPesquisa] = useState(''); // Estado para armazenar o termo de pesquisa
  const navigate = useNavigate(); // Hook de navegação do React Router

  useEffect(() => {
    // Função para buscar os projetos ao carregar o componente
    const fetchProjetos = async () => {
      try {
        const response = await fetch('/api/projeto'); // Requisição para obter os projetos da API
        if (!response.ok) {
          throw new Error('Projetos não encontrados!'); // Lança um erro se a requisição não for bem-sucedida
        }
        const data = await response.json(); // Converte a resposta para JSON
        setProjetos(data); // Atualiza o estado com os projetos obtidos
      } catch (error) {
        console.error('Erro ao buscar projetos:', error); // Exibe um erro no console se ocorrer algum problema na busca
      }
    };

    fetchProjetos(); // Chama a função para buscar os projetos
  }, []); // O array vazio [] assegura que o useEffect seja executado apenas uma vez, ao montar o componente

  // Função para lidar com a mudança no campo de pesquisa
  const handlePesquisaChange = (e) => {
    setPesquisa(e.target.value); // Atualiza o estado de pesquisa com o valor do campo de texto
  };

  // Filtra os projetos com base no termo de pesquisa inserido
  const projetosFiltrados = projetos.filter(projeto =>
    projeto.name.toLowerCase().includes(pesquisa.toLowerCase())
  );

  // Função para navegar para a página de edição de um projeto específico
  const handleEditarProjeto = (id) => {
    navigate(`/projeto/update/${id}`); // Navega para a URL que corresponde à edição do projeto com o ID fornecido
  };

  // Função para excluir um projeto
  const handleExcluirProjeto = async (id) => {
    try {
      const response = await fetch(`/api/projeto/${id}`, {
        method: 'DELETE', // Requisição DELETE para excluir o projeto com o ID fornecido
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir projeto'); // Lança um erro se a requisição DELETE não for bem-sucedida
      }
      setProjetos(projetos.filter(projeto => projeto.id !== id)); // Remove o projeto excluído da lista de projetos exibida
      console.log(`Projeto com ID ${id} excluído com sucesso`); // Exibe mensagem de sucesso no console
    } catch (error) {
      console.error('Erro ao excluir projeto:', error); // Exibe um erro no console se ocorrer algum problema na exclusão
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" component="h1" gutterBottom>
        Listagem de Projetos
      </Typography>

      {/* Formulário de pesquisa */}
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

      {/* Tabela de projetos */}
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
                  {/* Botão de editar projeto */}
                  <IconButton aria-label="Editar" onClick={() => handleEditarProjeto(row.id)}>
                    <CreateIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {/* Botão de excluir projeto */}
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
