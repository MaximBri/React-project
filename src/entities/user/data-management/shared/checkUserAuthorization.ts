import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getAuth, getLoading } from '@/app/store/slices/AuthSlice';

export const checkUserAuthorization = (path: string) => {
  const navigate = useNavigate();
  const auth = useSelector(getAuth);
  const authLoading = useSelector(getLoading);
  
  useEffect(() => {
    if (auth === false && authLoading === false) {
      navigate(path);
    }
  }, [authLoading, auth]);
};
