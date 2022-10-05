import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/user'
import authReducer from './slice/auth'

import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
  devTools: true,
})
type RootState = ReturnType<typeof store.getState> // A global
type AppDispatch = typeof store.dispatch // Type to access
export const useAppDispatch = () => useDispatch<AppDispatch>()
//useSelector hook with types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
