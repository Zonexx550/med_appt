import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('auth-user');
    const token = sessionStorage.getItem('auth-token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData, token) => {
    sessionStorage.setItem('auth-user', JSON.stringify(userData));
    sessionStorage.setItem('auth-token', token);
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem('auth-user');
    sessionStorage.removeItem('auth-token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
