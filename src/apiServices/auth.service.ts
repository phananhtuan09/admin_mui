import { ApiClient } from './apiClient'
import { userTypes } from '@/interfaces/auth.interface'
export const login = async (loginForm: userTypes) => {
  const response = await ApiClient.post(`/login`, {}, loginForm)
  if (Object.prototype.hasOwnProperty.call(response, 'data'))
    return response.data
  else return response
}
export const register = async (registerForm: userTypes) => {
  const response = await ApiClient.post(`/register`, {}, registerForm)
  if (Object.prototype.hasOwnProperty.call(response, 'data'))
    return response.data
  else return response
}
