import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

// Fallback dummy token generator
export const createDemoToken = (username = 'admin@nexora.io', role = 'MANAGER') => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ sub: username, role: role, iat: Math.floor(Date.now() / 1000) }));
  const signature = btoa('nexora-sec-signature');
  return `${header}.${payload}.${signature}`;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded;
      } catch (e) {
        return { sub: 'admin@nexora.io', role: 'MANAGER' };
      }
    }
    return { sub: 'admin@nexora.io', role: 'MANAGER' };
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (e) {
        setUser({ sub: 'admin@nexora.io', role: 'MANAGER' });
      }
    }
  }, []);

  const login = (tokenOrUsername, role = 'MANAGER') => {
    let finalToken = tokenOrUsername;
    let decodedUser = null;

    if (typeof tokenOrUsername === 'string' && tokenOrUsername.includes('.')) {
      try {
        decodedUser = jwtDecode(tokenOrUsername);
        finalToken = tokenOrUsername;
      } catch (e) {
        finalToken = createDemoToken(tokenOrUsername, role);
        decodedUser = { sub: tokenOrUsername, role };
      }
    } else {
      finalToken = createDemoToken(tokenOrUsername || 'admin@nexora.io', role);
      decodedUser = { sub: tokenOrUsername || 'admin@nexora.io', role };
    }

    localStorage.setItem('token', finalToken);
    setUser(decodedUser);
  };

  const switchRole = (newRole) => {
    const updatedUser = { ...user, role: newRole };
    const newToken = createDemoToken(user?.sub || user?.username || 'user@nexora.io', newRole);
    localStorage.setItem('token', newToken);
    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, switchRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
