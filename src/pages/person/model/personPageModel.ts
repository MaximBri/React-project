import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getAuth, getLoading } from '@/app/store/slices/AuthSlice';

export const personPageModel = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<number>(0);

  const loading = useSelector(getLoading);
  const auth = useSelector(getAuth);
  useEffect(() => {
    if (!loading && !auth) navigate('/');
  }, [loading, auth]);
  return {activeSection, setActiveSection, loading}
};
