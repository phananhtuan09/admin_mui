import ApiClient from './apiClient';
import { UserTypes } from '@/interfaces/auth.interface';

export const login = async (payload: UserTypes) => {
  const response = await ApiClient.post('/login', {}, payload);
  return response;
};
export const register = async (payload: UserTypes) => {
  const response = await ApiClient.post('/register', {}, payload);
  return response;
};
