// Importações necessárias do React, PropTypes e Material-UI
import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import img1 from '../assets/img/Design sem nome (6).png'; // Caminho para a imagem do logotipo

// Estilização do IconButton para telas maiores
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

// Estilização do AppBar para cores personalizadas
const StyledAppBar = styled(AppBar)({
  backgroundColor: '#000080',
  '&:hover': {
    backgroundColor: '#FF8C00',
  },
});

function Navbar({ notifications, emails }) {
  // Estados para gerenciar a abertura e fechamento dos menus
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl); // Verifica se o menu de perfil está aberto
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl); // Verifica se o menu mobile está aberto

  // Funções de manipulação de eventos para abrir e fechar menus
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // Menu para perfil do usuário
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  // Menu mobile
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={emails} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={notifications} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* StyledAppBar é utilizado aqui para aplicar a estilização personalizada */}
      <StyledAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ left: 0, right: 0 }}>
            <StyledIconButton size="large" edge="start" color="inherit" aria-label="open drawer">
              <MenuIcon />
            </StyledIconButton>
            {/* Link para a página inicial com o logotipo */}
            <Link to="/">
              <img src={img1} alt="Logo" style={{ height: '60px', marginRight: '10px' }} />
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            {/* Links de navegação para páginas diferentes */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <nav>
                <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
                  <li style={{ marginRight: '20px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
                  </li>
                  <li style={{ marginRight: '20px' }}>
                    <Link to="/projeto" style={{ textDecoration: 'none', color: 'white' }}>Projeto</Link>
                  </li>
                  <li style={{ marginRight: '20px' }}>
                    <Link to="/tarefa" style={{ textDecoration: 'none', color: 'white' }}>Tarefa</Link>
                  </li>
                  <li style={{ marginRight: '20px' }}>
                    <Link to="/equipe" style={{ textDecoration: 'none', color: 'white' }}>Equipe</Link>
                  </li>
                  <li style={{ marginRight: '20px' }}>
                    <Link to="/listaTarefa" style={{ textDecoration: 'none', color: 'white' }}>Lista tarefa</Link>
                  </li>
                  <li style={{ marginRight: '20px' }}>
                    <Link to="/listaProjeto" style={{ textDecoration: 'none', color: 'white' }}>Lista projeto</Link>
                  </li>
                </ul>
              </nav>
              {/* Ícones para emails e notificações com badge de contagem */}
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={emails} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={notifications} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            {/* Ícone de menu para dispositivos móveis */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </StyledAppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

// Definição dos tipos de propriedades para garantir que notifications e emails sejam números
Navbar.propTypes = {
  notifications: PropTypes.number.isRequired,
  emails: PropTypes.number.isRequired,
};

// Exportação do componente Navbar
export default Navbar;
