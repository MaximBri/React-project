import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/AuthSlice'

export const store = configureStore({
  reducer: {
    auth,
  },
})

export type RootState = ReturnType<typeof store.getState>