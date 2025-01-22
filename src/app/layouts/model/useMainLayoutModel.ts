import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import setUserDataByToken from '@/entities/user/data-management/setUserDataByToken';
import { TOKEN } from '@/shared/globals/globalsData';

export const useMainLayoutModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get(TOKEN);

  useEffect(() => {
    setUserDataByToken(token, dispatch, navigate);
  }, [token, dispatch]);
};
