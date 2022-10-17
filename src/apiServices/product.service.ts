import ApiClient from './apiClient';

export const geAllProduct = async () => {
  const response = await ApiClient.get('/products', {}, {});
  return response;
};
