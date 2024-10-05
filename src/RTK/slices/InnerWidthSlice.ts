import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: { isMobile: boolean, width: number } = {
  isMobile: false,
  width: 0,
}

const innerWidth = createSlice({
  name: 'innerWidth',
  initialState,
  reducers: {
    setWidth(state, action: PayloadAction<number>) {
      state.width = action.payload
      state.width <= 768 ? state.isMobile = true: state.isMobile = false
    },
  },
})
export const getWidth = (state: RootState) => state.width.width
export const getMobilePlatform = (state: RootState) => state.width.isMobile
export const { setWidth } = innerWidth.actions
export default innerWidth.reducer
