import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/api';
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const login = (payload) => { localStorage.setItem('token', payload.token); localStorage.setItem('user', JSON.stringify(payload.user)); setUser(payload.user); };
  const logout = () => { localStorage.clear(); setUser(null); };
  useEffect(() => { if (localStorage.getItem('token')) api.get('/auth/me').catch(logout); }, []);
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
