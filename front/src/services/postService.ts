import type { Post } from '../types';
import api from './api';

const BASE_URL = '/posts';

export const postService = {
  getAll: async () => {
    return api.get<Post[]>(BASE_URL);
  },
  
  getById: async (id: number) => {
    return api.get<Post>(`${BASE_URL}/${id}`);
  },
  
  create: async (data: { title: string; content: string }) => {
    return api.post<Post>(BASE_URL, data);
  },
  
  update: async (id: number, data: { title?: string; content?: string }) => {
    return api.put<Post>(`${BASE_URL}/${id}`, data);
  },
  
  delete: async (id: number) => {
    return api.delete(`${BASE_URL}/${id}`);
  },

  like: async (id: number) => {
    return api.post<{ message: string }>(`${BASE_URL}/${id}/like`);
  }
};

export const getAllPosts = async (): Promise<Post[]> => {
  const response = await postService.getAll();
  return response.data;
};

export const getPostById = async (id: number): Promise<Post> => {
  const response = await postService.getById(id);
  return response.data;
};

export const createPost = async (data: { title: string; content: string }): Promise<Post> => {
  const response = await postService.create(data);
  return response.data;
};

export const updatePost = async (id: number, data: { title?: string; content?: string }): Promise<Post> => {
  const response = await postService.update(id, data);
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await postService.delete(id);
};

export const likePost = async (id: number): Promise<void> => {
  await postService.like(id);
};

export default postService; 