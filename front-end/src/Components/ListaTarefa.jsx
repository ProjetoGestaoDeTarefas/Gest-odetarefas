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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'; // Importa componentes do Material-UI
import DeleteIcon from '@mui/icons-material/Delete'; // Importa ícone de deletar
import CreateIcon from '@mui/icons-material/Create'; // Importa ícone de editar
import ArchiveIcon from '@mui/icons-material/Archive'; // Importa ícone de arquivar
import { useNavigate } from 'react-router-dom'; // Importa hook de navegação do React Router

const ListaTarefa = () => {
  const [tarefas, setTarefas] = useState([]); // Estado para armazenar a lista de tarefas
  const [search, setSearch] = useState(''); // Estado para armazenar o termo de pesquisa
  const [openDialog, setOpenDialog] = useState(false); // Estado para controlar a abertura do diálogo de confirmação
  const [currentAction, setCurrentAction] = useState(''); // Estado para armazenar a ação atual (excluir ou arquivar)
  const [currentTaskId, setCurrentTaskId] = useState(null); // Estado para armazenar o ID da tarefa sobre a qual a ação será realizada
  const navigate = useNavigate(); // Hook de navegação do React Router

  useEffect(() => {
    // Função para buscar as tarefas ao carregar o componente
    const fetchTarefas = async () => {
      try {
        const response = await fetch('/api/projeto'); // Requisição para obter as tarefas da API
        if (!response.ok) {
          throw new Error('Erro ao buscar tarefas'); // Lança um erro se a requisição não for bem-sucedida
        }
        const data = await response.json(); // Converte a resposta para JSON
        setTarefas(data); // Atualiza o estado com as tarefas obtidas
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error); // Exibe um erro no console se ocorrer algum problema na busca
      }
    };

    fetchTarefas(); // Chama a função para buscar as tarefas
  }, []); // O array vazio [] assegura que o useEffect seja executado apenas uma vez, ao montar o componente

  // Função para lidar com a mudança no campo de pesquisa
  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Atualiza o estado de pesquisa com o valor do campo de texto
  };

  // Filtra as tarefas com base no termo de pesquisa inserido
  const filteredTarefas = tarefas.filter((tarefa) =>
    tarefa.descricao.toLowerCase().includes(search.toLowerCase())
  );

  // Função para abrir o diálogo de confirmação de ação (excluir ou arquivar)
  const handleOpenDialog = (action, taskId) => {
    setCurrentAction(action); // Define a ação atual (excluir ou arquivar)
    setCurrentTaskId(taskId); // Define o ID da tarefa sobre a qual a ação será realizada
    setOpenDialog(true); // Abre o diálogo de confirmação
  };

  // Função para fechar o diálogo de confirmação
  const handleCloseDialog = () => {
    setOpenDialog(false); // Fecha o diálogo de confirmação
    setCurrentAction(''); // Limpa a ação atual
    setCurrentTaskId(null); // Limpa o ID da tarefa
  };

  // Função para navegar para a página de edição de uma tarefa específica
  const handleEditarProjeto = (id) => {
    navigate(`/projeto/update/${id}`); // Navega para a URL que corresponde à edição da tarefa com o ID fornecido
  };

  // Função para excluir uma tarefa
  const handleExcluirProjeto = async (id) => {
    try {
      const response = await fetch(`/api/projeto/${id}`, {
        method: 'DELETE', // Requisição DELETE para excluir a tarefa com o ID fornecido
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir tarefa'); // Lança um erro se a requisição DELETE não for bem-sucedida
      }
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== id)); // Remove a tarefa excluída da lista de tarefas exibida
      console.log(`Tarefa com ID ${id} excluída com sucesso`); // Exibe mensagem de sucesso no console
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error); // Exibe um erro no console se ocorrer algum problema na exclusão
    }
  };

  // Função para arquivar uma tarefa
  const handleArquivarProjeto = async (id) => {
    try {
      const response = await fetch(`/api/projeto/archive/${id}`, {
        method: 'PATCH', // Requisição PATCH para arquivar a tarefa com o ID fornecido
      });
      if (!response.ok) {
        throw new Error('Erro ao arquivar tarefa'); // Lança um erro se a requisição PATCH não for bem-sucedida
      }
      setTarefas(tarefas.map((tarefa) => 
        tarefa.id === id ? { ...tarefa, arquivado: true } : tarefa
      )); // Atualiza a tarefa como arquivada na lista de tarefas exibida
      console.log(`Tarefa com ID ${id} arquivada com sucesso`); // Exibe mensagem de sucesso no console
    } catch (error) {
      console.error('Erro ao arquivar tarefa:', error); // Exibe um erro no console se ocorrer algum problema no arquivamento
    }
  };

  // Função para confirmar a ação de excluir ou arquivar uma tarefa
  const handleConfirmAction = async () => {
    if (currentAction === 'delete') {
      await handleExcluirProjeto(currentTaskId); // Executa a função de exclusão se a ação atual for 'delete'
    } else if (currentAction === 'archive') {
      await handleArquivarProjeto(currentTaskId); // Executa a função de arquivamento se a ação atual for 'archive'
    }
    handleCloseDialog(); // Fecha o diálogo de confirmação após a execução da ação
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" component="h1" gutterBottom>
        Listagem de Tarefas
      </Typography>

      {/* Formulário de pesquisa */}
      <form className="d-flex mb-2 ml-4" onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          variant="outlined"
          type="text"
          name="search"
          placeholder="Pesquisa..."
          value={search}
          onChange={handleSearchChange}
          style={{ flexGrow: 1, marginRight: '10px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchChange}
          style={{ minWidth: '150px' }}
        >
          <i className="fas fa-search me-1" style={{ marginRight: '8px' }}></i> Pesquisar
        </Button>
      </form>

      {/* Tabela de tarefas */}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Título</TableCell>
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
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.descricao}</TableCell>
                <TableCell>{row.start_date}</TableCell>
                <TableCell>{row.end_date}</TableCell>
                <TableCell>
                  {/* Botão de editar tarefa */}
                  <IconButton aria-label="Editar" onClick={() => handleEditarProjeto(row.id)}>
                    <CreateIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {/* Botão de excluir tarefa */}
                  <IconButton aria-label="Excluir" onClick={() => handleOpenDialog('delete', row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {/* Botão de arquivar tarefa */}
                  <IconButton aria-label="Arquivar" onClick={() => handleOpenDialog('archive', row.id)}>
                    <ArchiveIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de confirmação para ações de excluir ou arquivar tarefa */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar Ação</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* Mensagem específica dependendo da ação atual */}
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
