import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  return (
    <AppBar position="static" color="primary" sx={{ boxShadow: 4 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 600, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          DeskSharing-App
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 1 }, textTransform: 'none' }}
          >
            Home
          </Button>
          {!isAuthenticated ? (
            <Button
              color="inherit"
              onClick={() => navigate('/login')}
              sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 1 }, textTransform: 'none' }}
            >
              Login
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={logout}
              sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 1 }, textTransform: 'none' }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
