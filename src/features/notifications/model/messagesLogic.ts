import {
  clearMessage,
  pushMessage,
} from '@/app/store/slices/NotificationSlice';
import { messageInterface } from '@/shared/types';

export const setMessage = ({
  message,
  dispatch,
  statusCode,
}: messageInterface) => {
  dispatch(
    pushMessage({
      message,
      statusCode: statusCode,
    })
  );
  setTimeout(() => {
    dispatch(clearMessage());
  }, 3000);
};
