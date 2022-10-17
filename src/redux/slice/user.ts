import * as UserService from '@/apiServices/users.service';
import { IUserProps } from '@/interfaces/redux.interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState: IUserProps = {
  loading: false,
  users: [],
  error: null,
};

export const getAllUserDispatch = createAsyncThunk(
  'user/geAllUser',
  async (token: string, { rejectWithValue }) => {
    const response = await UserService.geAllUser(token);
    if (response.data) {
      return response.data;
    }
    return rejectWithValue(response.message);
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearState: (state) => {
      return {
        ...state,
        loading: false,
        users: [],
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserDispatch.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllUserDispatch.fulfilled, (state, action: any) => {
        return {
          ...state,
          loading: false,
          users: action.payload,
        };
      })
      .addCase(getAllUserDispatch.rejected, (state, action: any) => {
        return {
          ...state,
          loading: false,
          users: [],
          error: action.payload.message,
        };
      });
  },
});
export const { clearState } = userSlice.actions;
export default userSlice.reducer;
