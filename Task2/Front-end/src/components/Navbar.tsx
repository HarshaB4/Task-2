import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { getToken, setToken } from '../api/api';

export default function Navbar() {
  const navigate = useNavigate();
  const token = getToken();

  function logout() {
    setToken(null);
    navigate('/login');
  }

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
          Storage
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button component={RouterLink} to="/dashboard" color="inherit">Dashboard</Button>
          <Button component={RouterLink} to="/folders" color="inherit">Folders</Button>
          {token ? (
            <Button onClick={logout} color="inherit" variant="outlined">Logout</Button>
          ) : (
            <Button component={RouterLink} to="/login" color="inherit">Login</Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
