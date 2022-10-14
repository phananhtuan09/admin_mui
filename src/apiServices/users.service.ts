import ApiClient from './apiClient';

export const geAllUser = async (userToken = '') => {
  const response = await ApiClient.get('/users', {}, {}, userToken);
  return response;
};
