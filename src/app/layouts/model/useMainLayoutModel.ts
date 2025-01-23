import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import setUserDataByToken from '@/entities/user/data-management/setUserDataByToken';
import { TOKEN } from '@/shared/globals/globalsData';
import {
  getAuthWindow,
  getCatWindow,
  getRegisterWindow,
} from '@/app/store/slices/WindowsSlice';

export const useMainLayoutModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get(TOKEN);
  const authWindow = useSelector(getAuthWindow);
  const registerWindow = useSelector(getRegisterWindow);
  const catWindow = useSelector(getCatWindow);

  useEffect(() => {
    setUserDataByToken(token, dispatch, navigate);
  }, [token, dispatch]);
  return {
    authWindow,
    registerWindow,
    catWindow,
  };
};
