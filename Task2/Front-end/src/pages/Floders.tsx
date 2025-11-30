import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Card, CardContent, CardActions, Paper } from '@mui/material';

export default function Folders() {
  const [folders, setFolders] = useState<any[]>([]);
  const [name, setName] = useState('');
  const userStr = localStorage.getItem('user');
  const token=localStorage.getItem('logintoken');
  let user: any = null;
  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch {}
console.log(user,"user");
  useEffect(() => { load(); }, []);
  async function load() {
    const res = await api.get('/folders');
    setFolders(res.data);
  }
  async function create() {
    await api.post('/folders', { name, email: user?.email, password: user?.password, token:token });
    setName('');
    load();
  }
  async function del(id: string) {
    if (!confirm('Delete folder?')) return;
    await api.delete(`/folders/${id}`);
    load();
  }
  return (
    <Box>
      {/* <Paper sx={{ p: 2, mb: 2, bgcolor: 'grey.100' }}>
        <Typography variant="subtitle1">
          <strong>Logged in as:</strong> {user?.email || 'Unknown'}
        </Typography>
        <Typography variant="subtitle2">
          <strong>Password:</strong> {user?.password || 'Unknown'}
        </Typography>
      </Paper> */}
      <Typography variant="h4" sx={{ mb: 3 }}>
        All Top-level Folders
      </Typography>
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="New folder name"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ maxWidth: 400 }}
        />
        <Button 
          onClick={create} 
          variant="contained" 
          color="primary"
        >
          Create
        </Button>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
        {folders.map(f => (
          <Card key={f._id} sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                {f.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Created: {new Date(f.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
            <CardActions sx={{ gap: 1 }}>
              <Button 
                component={Link} 
                to={`/folders/${f._id}`}
                size="small"
                color="primary"
              >
                Open
              </Button>
              <Button 
                onClick={() => del(f._id)}
                size="small"
                color="error"
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
