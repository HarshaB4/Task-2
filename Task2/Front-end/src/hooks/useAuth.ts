import { useState } from 'react';
import api, { setToken } from '../api/api';

export default function useAuth() {
  const [user, setUser] = useState<any>(null);

  async function login(email: string, password: string) {
    const res = await api.post('/auth/login', { email, password });
    const { token, user } = res.data;
    setToken(token);
    setUser(user);
    return user;
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  return { user, login, logout };
}
