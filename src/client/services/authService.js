import axios from 'axios';
import { API_ENDPOINTS, AUTH_PROVIDERS } from '../config/constants';

export async function authenticateUser(provider, credentials) {
  try {
    const response = await axios.post(`${API_ENDPOINTS.AUTH}/${provider}`, credentials);
    
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error(error.response?.data?.message || 'Authentication failed');
  }
}

export function logout() {
  localStorage.removeItem('auth_token');
  delete axios.defaults.headers.common['Authorization'];
}