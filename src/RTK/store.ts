import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/AuthSlice'
import width from './slices/InnerWidthSlice'

export const store = configureStore({
  reducer: {
    auth,
    width,
  },
})

export type RootState = ReturnType<typeof store.getState>