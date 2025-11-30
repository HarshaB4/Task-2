import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';
import { Box, Typography, Stack, Card, CardContent, Button } from '@mui/material';

export default function Dashboard() {
  const [roots, setRoots] = useState<any[]>([]);
  useEffect(() => {
    api.get('/folders').then(r => setRoots(r.data));
  }, []);
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Root Folders
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
          {roots.map(f => (
            <Card key={f._id} sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {f.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Created: {new Date(f.createdAt).toLocaleString()}
                </Typography>
                <Button 
                  component={Link} 
                  to={`/folders/${f._id}`}
                  variant="text"
                  color="primary"
                >
                  Open
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}