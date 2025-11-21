import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '../types';
import { getUserByUsername } from '../lib/db-service';

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is stored in sessionStorage
    const storedUser = sessionStorage.getItem('auth-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (
    username: string,
    _password: string
  ): Promise<boolean> => {
    // For demo purposes, we'll accept any password
    // In production, you'd validate against stored credentials
    const foundUser = await getUserByUsername(username);

    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      sessionStorage.setItem('auth-user', JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('auth-user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
