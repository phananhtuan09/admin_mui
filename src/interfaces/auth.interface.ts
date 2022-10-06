export interface userTypes {
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
export interface authTypes {
  loading: boolean;
  userInfo: userTypes;
  error: unknown;
  isAuthenticated: boolean;
}
