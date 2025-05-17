import type { User } from '../types';
import api from './api';

// Servicio de usuarios
export const userService = {  
  // Obtener el perfil del usuario actual
  getProfile: async () => {
    return api.get<User>('/profile');
  },
};


// Funciones helper
export const getProfile = async (): Promise<User> => {
  const response = await userService.getProfile();
  return response.data;
};

export default userService;
