import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/AuthSlice'
import windows from './slices/WindowsSlice'
import cat from './slices/CatSlice'
import notification from './slices/NotificationSlice'

export const store = configureStore({
  reducer: {
    auth,
    windows,
    cat,
    notification,
  },
})

export type RootState = ReturnType<typeof store.getState>