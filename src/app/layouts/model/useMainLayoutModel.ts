import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import setUserDataByToken from '@/entities/user/data-by-token/setUserDataByToken';

export const useMainLayoutModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get('token');

  useEffect(() => {
    setUserDataByToken(token, dispatch, navigate);
  }, [token, dispatch]);
};
