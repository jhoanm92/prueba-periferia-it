import { api } from './api';
import type { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

interface LoginResponse {
  token: string;
}

interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

interface LoginCredentials {
  email: string;
  password: string;
}


export const login = async (email: string, password: string) => {
  const credentials: LoginCredentials = {
    email,
    password
  };
  
  try {
    const response = await api.post<LoginResponse>('/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
      
      const decoded = jwtDecode<TokenPayload>(response.data.token);
      
      const userData = {
        id: decoded.id
      };
      
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
      return { token: response.data.token, user: userData };
    }
    
    throw new Error('No se recibió un token válido');
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;
    if (axiosError.response?.status === 401) {
      throw new Error('Credenciales inválidas');
    }
    if (!axiosError.response) {
      throw new Error('No se pudo conectar con el servidor. Por favor, verifica que el servidor esté corriendo en http://localhost:3000');
    }
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
  
  window.dispatchEvent(new Event('storage'));
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getCurrentUser = () => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};
