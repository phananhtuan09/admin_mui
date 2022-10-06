import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    userInfo: {},
    userToken: null,
    error: null,
    success: false,
  },
  reducers: {
    addUsers: (state, action) => {},
  },
});
export const { addUsers } = userSlice.actions;
export default userSlice.reducer;
