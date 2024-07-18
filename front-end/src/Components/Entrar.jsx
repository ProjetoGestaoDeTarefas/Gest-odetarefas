import Avatar from '@mui/material/Avatar'; // Importação do componente Avatar do Material-UI
import Button from '@mui/material/Button'; // Importação do componente Button do Material-UI
import CssBaseline from '@mui/material/CssBaseline'; // Importação do componente CssBaseline do Material-UI para padronizar o CSS
import TextField from '@mui/material/TextField'; // Importação do componente TextField do Material-UI
import FormControlLabel from '@mui/material/FormControlLabel'; // Importação do componente FormControlLabel do Material-UI
import Checkbox from '@mui/material/Checkbox'; // Importação do componente Checkbox do Material-UI
import Grid from '@mui/material/Grid'; // Importação do componente Grid do Material-UI
import Box from '@mui/material/Box'; // Importação do componente Box do Material-UI
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Importação do ícone LockOutlined do Material-UI
import Typography from '@mui/material/Typography'; // Importação do componente Typography do Material-UI
import Container from '@mui/material/Container'; // Importação do componente Container do Material-UI
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Importação do ThemeProvider e createTheme do Material-UI
import { GlobalStyles } from '@mui/material'; // Importação do GlobalStyles do Material-UI

const defaultTheme = createTheme(); // Criação de um tema padrão

// Função de componente SignUp
export default function SignUp() {
    // Função para lidar com o envio do formulário
    const handleSubmit = (event) => {
        event.preventDefault(); // Previne o comportamento padrão do formulário
        const data = new FormData(event.currentTarget); // Cria um objeto FormData com os dados do formulário
        console.log({
            email: data.get('email'), // Obtém o valor do campo de email
            password: data.get('password'), // Obtém o valor do campo de senha
        });
    };

    return (
        // Provedor de tema do Material-UI
        <ThemeProvider theme={defaultTheme}>
            {/* Estilos globais */}
            <GlobalStyles
                styles={{
                    body: { flexDirection: 'column' }, // Define a direção do flex no body
                }}
            />
            {/* Container principal */}
            <Container component="main" maxWidth="xs">
                <CssBaseline /> {/* Reset de CSS */}
                <Box
                    sx={{
                        marginTop: 25, // Margem superior
                        display: 'flex', // Define como flexbox
                        flexDirection: 'column', // Direção das crianças como coluna
                        alignItems: 'center', // Alinha itens ao centro
                        backgroundColor: '#5353ec', // Cor de fundo
                        borderRadius: '25px' // Borda arredondada
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> {/* Avatar com ícone */}
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5"> {/* Título */}
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, }}> {/* Formulário */}
                        <Grid container spacing={2}> {/* Container com Grid */}
                            <Grid item xs={12}> {/* Item do Grid */}
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}> {/* Item do Grid */}
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Senha"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}> {/* Item do Grid */}
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />} // Checkbox com label
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }} // Margem superior e inferior
                        >
                            Entrar
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
