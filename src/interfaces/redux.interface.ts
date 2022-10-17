export interface IUserInfo {
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
export interface IUserProps {
  loading: boolean;
  users: Array<IUserInfo>;
  error: unknown;
}
export interface IAuthProps {
  loading: boolean;
  userInfo: IUserInfo;
  error: unknown;
  isAuthenticated: boolean;
  //remember: boolean;
}

export interface IProductInfo {
  id: number | string;
  name: string;
  price: number;
  priceSale: null | number;
  quantity: number;
  thumbnail: string;
  status: string;
  createdAt: Date;
  modifiedAt: Date;
}
export interface IProductProps {
  loading: boolean;
  products: Array<IProductInfo>;
  error: unknown;
}
