export interface UserTypes {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  avatar?: string;
  password?: string;
  passwordConfirm?: string;
  email?: string;
  gender?: string;
  phone?: string;
  birthday?: string;
  status?: boolean;
  createdAt?: number;
  modifiedAt?: number;
  accessToken?: string;
  refreshToken?: string;
  remember?: boolean;
}
export interface AuthTypes {
  loading: boolean;
  userInfo: UserTypes;
  error: unknown;
  isAuthenticated: boolean;
  //remember: boolean;
}
export interface AllUser {
  loading: boolean;
  users: Array<UserTypes>;
  error: unknown;
}
