import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './app';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Folders from './pages/Floders';
import FolderView from './pages/FloderView';
import PublicView from './pages/publicView';
import './styles/index.css';
import { getToken } from './api/api';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = getToken();
  return token ? children : <Navigate to="/login" />;
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
          <Route path="folders" element={<PrivateRoute><Folders/></PrivateRoute>} />
          <Route path="folders/:id" element={<PrivateRoute><FolderView/></PrivateRoute>} />
          <Route path="public/:shareId" element={<PublicView/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);