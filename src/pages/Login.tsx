import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (login(username, password)) {
      setError('');
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              required
              label="Username"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              required
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
