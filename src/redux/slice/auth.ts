import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as AuthService from '@/apiServices/auth.service';

import { UserTypes, AuthTypes } from '@/interfaces/auth.interface';
export const loginDispatch = createAsyncThunk(
  'auth/login',
  async (loginForm: UserTypes, { rejectWithValue }) => {
    const response = await AuthService.login(loginForm);
    if (response.message) {
      return rejectWithValue(response.message);
    } else {
      localStorage.setItem('userInfo', JSON.stringify(response));
      return response;
    }
  }
);
export const registerDispatch = createAsyncThunk(
  'auth/register',
  async (registerForm: UserTypes, { rejectWithValue }) => {
    const response = await AuthService.register(registerForm);

    if (response.message) {
      return rejectWithValue(response.message);
    } else {
      return response;
    }
  }
);
const initialState: AuthTypes = {
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
    //   [logout.fulfilled]: (state, action) => {
    //     state.isAuthenticated = false;
    //     state.user = {};
    //   },
  },
});
export const { clearState } = authSlice.actions;
export default authSlice.reducer;
