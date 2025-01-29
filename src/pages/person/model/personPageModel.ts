import { useState } from 'react';
import { useSelector } from 'react-redux';

import { getLoading } from '@/app/store/slices/AuthSlice';
import { routes } from '@/app/routes/model/routes';
import { checkUserAuthorization } from '@/entities/user/data-management/shared/checkUserAuthorization';

export const personPageModel = () => {
  const loading = useSelector(getLoading);
  const [activeSection, setActiveSection] = useState<number>(0);

  checkUserAuthorization(routes.main.home.path);

  return { activeSection, setActiveSection, loading };
};
