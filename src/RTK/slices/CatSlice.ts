import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: { existed: boolean | null, name: string | null } = {
  existed: null,
  name: null,
}

const CatSlice = createSlice({
  name: 'cat',
  initialState,
  reducers: {
    setExisting(state, action: PayloadAction<boolean>) {
      state.existed = action.payload
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
  },
})
export const getExisting = (state: RootState) => state.cat.existed
export const getName = (state: RootState) => state.cat.name
export const { setExisting, setName } =
CatSlice.actions
export default CatSlice.reducer
