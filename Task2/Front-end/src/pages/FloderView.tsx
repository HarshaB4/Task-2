import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Paper,
  Stack,
  Divider,
  CircularProgress
} from '@mui/material';

export default function FolderView() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [folderName, setFolderName] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [renameValue, setRenameValue] = useState('');
  const [renaming, setRenaming] = useState(false);

  useEffect(() => { if (id) load(); }, [id]);

  async function load() {
    const res = await api.get(`/folders/${id}`);
    setData(res.data);
    setRenameValue(res.data.folder.name);
  }
    async function renameFolder() {
      if (!renameValue.trim()) return;
      setRenaming(true);
      await api.put(`/folders/${id}`, { name: renameValue });
      setRenaming(false);
      load();
    }
  async function createFolder() {
    await api.post('/folders', { name: folderName, parent: id });
    setFolderName('');
    load();
  }
  async function createFile() {
    await api.post('/files', { name: fileName, url: fileUrl, folder: id });
    setFileName(''); setFileUrl('');
    load();
  }
  async function share(targetId: string, targetType: 'folder'|'file') {
    const res = await api.post('/share/generate', { targetId, targetType, ttlDays: null });
    alert(`Share URL: ${window.location.origin}/public/${res.data.shareId}`);
  }
  async function revoke(shareId: string) {
    await api.post(`/share/revoke/${shareId}`);
    alert('Revoked');
  }

  if (!data) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );
  
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Folder: {data.folder.name}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2, maxWidth: 500 }}>
        <TextField
          value={renameValue}
          onChange={e => setRenameValue(e.target.value)}
          label="Rename Folder"
          size="small"
          fullWidth
        />
        <Button
          onClick={renameFolder}
          variant="contained"
          color="warning"
          disabled={renaming}
        >
          Rename
        </Button>
      </Stack>
      <Paper sx={{ p: 3, boxShadow: 2 }}>
        {/* Child Folders Section */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Child Folders
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
          {data.children.map((c: any) => (
            <Card key={c._id} variant="outlined">
              <CardContent>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {c.name}
                </Typography>
                <Button 
                  component={Link} 
                  to={`/folders/${c._id}`}
                  size="small"
                  color="primary"
                >
                  Open
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
        
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <TextField 
            value={folderName} 
            onChange={e => setFolderName(e.target.value)} 
            placeholder="New subfolder"
            size="small"
            fullWidth
            sx={{ maxWidth: 300 }}
          />
          <Button 
            onClick={createFolder} 
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Files Section */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Files
        </Typography>
        <Stack spacing={2} sx={{ mb: 3 }}>
          {data.files.map((f: any) => (
            <Paper key={f._id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {f.name}
                  </Typography>
                  <Typography 
                    component="a" 
                    href={f.url} 
                    target="_blank" 
                    rel="noreferrer"
                    variant="body2"
                    color="primary"
                    sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    {f.url}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Button 
                    onClick={() => share(f._id, 'file')}
                    size="small"
                    color="primary"
                  >
                    Share
                  </Button>
                  <Button 
                    onClick={async () => { await api.delete(`/files/${f._id}`); load(); }}
                    size="small"
                    color="error"
                  >
                    Delete
                  </Button>
                </Stack>
              </Box>
            </Paper>
          ))}
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <TextField 
            value={fileName} 
            onChange={e => setFileName(e.target.value)} 
            placeholder="File name"
            size="small"
          />
          <TextField 
            value={fileUrl} 
            onChange={e => setFileUrl(e.target.value)} 
            placeholder="File URL"
            size="small"
            sx={{ flexGrow: 1 }}
          />
          <Button 
            onClick={createFile} 
            variant="contained"
            color="success"
          >
            Add File
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Button 
            onClick={() => share(id as string, 'folder')}
            variant="contained"
            color="secondary"
          >
            Generate Share Link for Folder
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}