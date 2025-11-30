import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Stack,
  Divider,
  Link as MuiLink
} from '@mui/material';

export default function PublicView() {
  const { shareId } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!shareId) return;
    api.get(`/share/${shareId}`)
      .then(r => setData(r.data))
      .catch(() => setData({ error: 'Not found or revoked' }));
  }, [shareId]);

  if (!data) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <CircularProgress />
    </Box>
  );
  if (data.error) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Alert severity="error">{data.error}</Alert>
    </Box>
  );

  if (data.type === 'file') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Paper sx={{ maxWidth: 600, width: '100%', p: 4, boxShadow: 3 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Shared File
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            {data.file.name}
          </Typography>
          <MuiLink href={data.file.url} target="_blank" rel="noreferrer" color="primary" underline="hover">
            {data.file.url}
          </MuiLink>
        </Paper>
      </Box>
    );
  } else {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Paper sx={{ maxWidth: 900, width: '100%', p: 4, boxShadow: 3 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Shared Folder: {data.folder.name}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Files
          </Typography>
          <Stack spacing={2}>
            {data.files.map((f: any) => (
              <Paper key={f._id} variant="outlined" sx={{ p: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {f.name}
                </Typography>
                <MuiLink href={f.url} target="_blank" rel="noreferrer" color="primary" underline="hover">
                  {f.url}
                </MuiLink>
              </Paper>
            ))}
          </Stack>
        </Paper>
      </Box>
    );
  }
}
