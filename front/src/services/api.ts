import axios from 'axios';
import type { 
  AxiosError, 
  AxiosResponse, 
  InternalAxiosRequestConfig,
  RawAxiosResponseHeaders
} from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error('Error de respuesta:', error.response.status, error.response.data);
      
      if (error.response.status === 401) {
        console.warn('Sesión expirada o no autorizada');
        localStorage.removeItem('auth_token');
      }
    } else if (error.request) {
      console.error('No se pudo conectar con el servidor. Por favor, verifica que el servidor esté corriendo en http://localhost:3000');
    } else {
      console.error('Error al configurar la solicitud:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders;
}

export const handleApiResponse = <T>(response: AxiosResponse): ApiResponse<T> => {
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  };
};

export const api = {
  async get<T>(url: string, config?: Partial<InternalAxiosRequestConfig>): Promise<ApiResponse<T>> {
    const response = await apiClient.get<T>(url, config);
    return handleApiResponse(response);
  },
  
  async post<T, D = unknown>(url: string, data?: D, config?: Partial<InternalAxiosRequestConfig>): Promise<ApiResponse<T>> {
    const response = await apiClient.post<T>(url, data, config);
    return handleApiResponse(response);
  },
  
  async put<T, D = unknown>(url: string, data?: D, config?: Partial<InternalAxiosRequestConfig>): Promise<ApiResponse<T>> {
    const response = await apiClient.put<T>(url, data, config);
    return handleApiResponse(response);
  },
  
  async patch<T, D = unknown>(url: string, data?: D, config?: Partial<InternalAxiosRequestConfig>): Promise<ApiResponse<T>> {
    const response = await apiClient.patch<T>(url, data, config);
    return handleApiResponse(response);
  },
  
  async delete<T>(url: string, config?: Partial<InternalAxiosRequestConfig>): Promise<ApiResponse<T>> {
    const response = await apiClient.delete<T>(url, config);
    return handleApiResponse(response);
  }
};

export default api;
