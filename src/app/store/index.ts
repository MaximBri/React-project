import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import userDevice from '@/entities/user/data-management/shared/UserDeviceSlice';
import auth from '@/entities/user/authorization/model/AuthSlice';
import cat from '@/entities/cat/model/CatSlice';
import windows from './slices/WindowsSlice';
import notification from './slices/NotificationSlice';
import coins from '@/entities/coins/model/CoinsSlice';
import pies from '@/entities/pies/model/piesSlice';

export const store = configureStore({
  reducer: {
    auth,
    windows,
    cat,
    notification,
    userDevice,
    coins,
    pies,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
