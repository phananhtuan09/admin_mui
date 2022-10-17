import ApiClient from './apiClient';
import { IUserInfo } from '@/interfaces/redux.interface';

export const login = async (payload: IUserInfo) => {
  const response = await ApiClient.post('/login', {}, payload);
  return response;
};
export const register = async (payload: IUserInfo) => {
  const response = await ApiClient.post('/register', {}, payload);
  return response;
};
