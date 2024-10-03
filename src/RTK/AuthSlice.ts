import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

const initialState: { auth: boolean } = {
  auth: false,
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.auth = action.payload
    },
  },
})
export const getAuth = (state: RootState) => state.auth.auth
export const { setAuth } = AuthSlice.actions
export default AuthSlice.reducer
