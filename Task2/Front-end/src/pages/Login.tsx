import React, { useState } from 'react';
import api, { setToken } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button, Alert, Stack } from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.token);
      let saveEmail = res.data.user.email;
      let savePassword = password;
      if (saveEmail === 'Admin@gmail.com' && (savePassword === 'admin@123' || savePassword === 'password')) {
        localStorage.setItem('user', JSON.stringify({
          email: 'Admin@gmail.com',
          password: savePassword
        }));
      } else {
        localStorage.setItem('user', JSON.stringify({
          email: saveEmail,
          password: savePassword
        }));
      }
      nav('/dashboard');
    } catch (e: any) {
      setErr(e.response?.data?.message || 'Login failed');
    }
  }

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        bgcolor: 'grey.100'
      }}
    >
      <Paper 
        sx={{ 
          p: 4, 
          maxWidth: 400, 
          width: '100%',
          mx: 2,
          boxShadow: 3
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
          Login
        </Typography>
        <Box component="form" onSubmit={submit}>
          <Stack spacing={3}>
            <TextField 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Email"
              label="Email"
              type="email"
              fullWidth
              required
            />
            <TextField 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Password"
              label="Password"
              fullWidth
              required
            />
            <Button 
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Login
            </Button>
            {err && <Alert severity="error">{err}</Alert>}
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
