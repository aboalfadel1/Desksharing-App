import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar: React.FC = () => {
  const navigate= useNavigate()
  const {isAuthenticated,logout} = useAuth();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          DeskSharing-App
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {!isAuthenticated ? (
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        ) : (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;