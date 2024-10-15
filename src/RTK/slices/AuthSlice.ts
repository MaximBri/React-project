import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: { auth: boolean, data: {} } = {
  auth: false,
  data: {
    name: '',
    surname: '',
    email: '',
  }
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.auth = action.payload
      console.log(action.payload)
    },
    setAllFields(state, action: PayloadAction<{name: string, surname: string, email: string}>){
      state.data = action.payload
      if(action.payload.name) state.auth = true;
    }
  },
})
export const getAuth = (state: RootState) => state.auth.auth
export const getAllFields = (state: RootState) => state.auth.data
export const { setAuth, setAllFields } = AuthSlice.actions
export default AuthSlice.reducer
