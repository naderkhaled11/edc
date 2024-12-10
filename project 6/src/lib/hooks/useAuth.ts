import { useState, useCallback } from 'react';
import { verifyAdmin } from '../db';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError('');
    
    try {
      const admin = await verifyAdmin(username, password);
      if (admin) {
        setIsAuthenticated(true);
        return true;
      } else {
        setError('Invalid credentials');
        return false;
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    error,
    loading,
    login,
    logout,
  };
}