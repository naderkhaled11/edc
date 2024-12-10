import { useState } from 'react';
import { verifyAdmin } from '../db';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const admin = await verifyAdmin(username, password);
      if (admin) {
        return true;
      } else {
        setError('Invalid username or password');
        return false;
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
}