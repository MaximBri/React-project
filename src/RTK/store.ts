import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/AuthSlice'
import windows from './slices/WindowsSlice'
import cat from './slices/CatSlice'

export const store = configureStore({
  reducer: {
    auth,
    windows,
    cat,
  },
})

export type RootState = ReturnType<typeof store.getState>