import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getAuth, getLoading } from '@/app/store/slices/AuthSlice';
import { routes } from '@/app/routes/model/routes';

export const personPageModel = () => {
  const navigate = useNavigate();
  const loading = useSelector(getLoading);
  const auth = useSelector(getAuth);
  const [activeSection, setActiveSection] = useState<number>(0);

  useEffect(() => {
    if (!loading && !auth) navigate(routes.main.home.path);
  }, [loading, auth]);

  return { activeSection, setActiveSection, loading };
};
