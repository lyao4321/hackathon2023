import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Mentor Sign up', 'Mentee Sign Up'];

interface RegisterBarProps {
    isCompany: boolean;
  } 

function RegisterBar({ isCompany }: RegisterBarProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pageRoutes = {
    'Mentor Sign up': '/company/register',
    'Mentee Sign Up': '/register',
  };  

  const navigateSite = (page: string) => {
    handleCloseNavMenu();
    type PageKey = keyof typeof pageRoutes;
    const route = pageRoutes[page as PageKey];
    if (route) {
      navigate(route);
    }
  };
  
  const goHome = () => {
    navigate('/')
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} onClick={goHome}/>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'}}}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigateSite(page)}
                sx={{ my: 2,
                     color: 'white',
                      display: 'block',
                      fontWeight: (
                        (page === 'Mentor Sign up' && isCompany) || 
                        (page === 'Mentee Sign Up' && !isCompany)
                      ) ? 'bold' : 'normal',
                      borderBottom: (
                        (page === 'Mentor Sign up' && isCompany) || 
                        (page === 'Mentee Sign Up' && !isCompany)
                      ) ? '2px solid white' : 'none'
                    }}
              >
                {page}
              </Button>
            ))}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default RegisterBar;