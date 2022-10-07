export interface UserTypes {
  username?: string;
  password?: string;
  passwordConfirm?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  gender?: string;
  phone?: string;
  birthday?: string;
  status?: boolean;
  createdAt?: number;
  modifiedAt?: number;
  accessToken?: string;
  refreshToken?: string;
}
export interface AuthTypes {
  loading: boolean;
  userInfo: UserTypes;
  error: unknown;
  isAuthenticated: boolean;
}
