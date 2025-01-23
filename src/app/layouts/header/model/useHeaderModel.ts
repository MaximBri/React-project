import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';

import { getAuth } from '@/app/store/slices/AuthSlice';
import { getUserDevice, setDevice } from '@/app/store/slices/UserDeviceSlice';
import { getExisting } from '@/app/store/slices/CatSlice';
import { setUserDevice } from '@/features/user/lib/setUserDevice';
import { routes } from '@/app/routes/model/routes';
import { setAuthWindow } from '@/app/store/slices/WindowsSlice';
import { PREV_PAGE } from '@/shared/globals/globalsData';

export const useHeaderModel = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const auth = useSelector<any, boolean>(getAuth);
  const catExisting = useSelector(getExisting);
  const device = useSelector(getUserDevice);
  let userName =
    useSelector<any, string>((state) => state.auth.data.name) || 'User';

  const onAuthButtonClick = useCallback(() => {
    if (device === 'mobile') {
      localStorage.setItem(
        PREV_PAGE,
        window.location.hash.slice(2, window.location.hash.length)
      );
      navigation(routes.main.auth.path);
    } else dispatch(setAuthWindow(true));
  }, [device]);

  useEffect(() => {
    dispatch(setDevice(setUserDevice()));
    const f = () => {
      dispatch(setDevice(setUserDevice()));
    };
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);

  return {
    auth,
    catExisting,
    userName,
    onAuthButtonClick,
  };
};
