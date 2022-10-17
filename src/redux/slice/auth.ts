import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as AuthService from '@/apiServices/auth.service';

import { IUserInfo, IAuthProps } from '@/interfaces/redux.interface';

export const loginDispatch = createAsyncThunk(
  'auth/login',
  async (loginForm: IUserInfo, { rejectWithValue }) => {
    const { email, password, remember } = loginForm;
    const response = await AuthService.login({ email, password });
    if (response.data) {
      return response.data;
    }
    return rejectWithValue(response.message);
  }
);
export const registerDispatch = createAsyncThunk(
  'auth/register',
  async (registerForm: IUserInfo, { rejectWithValue }) => {
    const response = await AuthService.register(registerForm);

    if (response.data) {
      return response.data;
    }
    return rejectWithValue(response.message);
  }
);
const initialState: IAuthProps = {
  loading: false,
  userInfo: {},
  error: '',
  isAuthenticated: false,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState: (state) => {
      return {
        ...state,
        loading: false,
        userInfo: {},
        error: '',
        isAuthenticated: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerDispatch.pending, (state) => {
        return {
          ...state,
          loading: true,
          isAuthenticated: false,
        };
      })
      .addCase(registerDispatch.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          userInfo: action.payload,
        };
      })
      .addCase(registerDispatch.rejected, (state, action: any) => {
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          userInfo: {},
          error: action.payload.message,
        };
      })
      .addCase(loginDispatch.pending, (state) => {
        return {
          ...state,
          loading: true,
          isAuthenticated: false,
        };
      })
      .addCase(loginDispatch.fulfilled, (state, action: any) => {
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          userInfo: action.payload,
          error: '',
        };
      })
      .addCase(loginDispatch.rejected, (state, action: any) => {
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          userInfo: {},
          error: action.payload.message,
        };
      });
  },
});
export const { clearState } = authSlice.actions;
export default authSlice.reducer;
