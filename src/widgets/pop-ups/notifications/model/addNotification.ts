import {
  clearMessage,
  pushMessage,
} from '@/app/store/slices/NotificationSlice';
import { UnknownAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';

export const addNotification = (
  dispatch: Dispatch<UnknownAction>,
  message: string,
  statusCode: number = 400,
  time: number = 3000
) => {
  dispatch(
    pushMessage({
      message,
      statusCode,
    })
  );
  setTimeout(() => {
    dispatch(clearMessage());
  }, time);
};
