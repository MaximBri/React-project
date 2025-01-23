import { configureStore } from '@reduxjs/toolkit';

import auth from './slices/AuthSlice';
import windows from './slices/WindowsSlice';
import cat from './slices/CatSlice';
import notification from './slices/NotificationSlice';
import userDevice from './slices/UserDeviceSlice';

export const store = configureStore({
  reducer: {
    auth,
    windows,
    cat,
    notification,
    userDevice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
