import {
  getAuthWindow,
  getCatWindow,
  getRegisterWindow,
} from '@/app/store/slices/WindowsSlice';
import { Portal } from '@/shared/ui';
import { Auth, CreateCat, Register } from '@/widgets/pop-ups';
import { memo } from 'react';
import { useSelector } from 'react-redux';

export const AppPortals = memo(() => {
  const authWindow = useSelector(getAuthWindow);
  const registerWindow = useSelector(getRegisterWindow);
  const catWindow = useSelector(getCatWindow);
  return (
    <Portal>
      {authWindow && <Auth />}
      {registerWindow && <Register />}
      {catWindow && <CreateCat />}
    </Portal>
  );
});
