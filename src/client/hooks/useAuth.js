import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_PROVIDERS } from '../config/constants';
import { authenticateUser } from '../services/authService';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAuth = useCallback(async (provider, credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authenticateUser(provider, credentials);
      if (response.success) {
        navigate('/dashboard');
        return response.data;
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return {
    loading,
    error,
    handleAuth
  };
}