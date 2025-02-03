import { useState } from 'react';
import { useSelector } from 'react-redux';

import { routes } from '@/shared/config/routes';
import { getLoading } from '@/entities/user/authorization/model/AuthSlice';
import { checkUserAuthorization } from '@/entities/user/data-management/shared/checkUserAuthorization';

export const personPageModel = () => {
  const loading = useSelector(getLoading);
  const [activeSection, setActiveSection] = useState<number>(0);

  checkUserAuthorization(routes.main.home.path);

  return { activeSection, setActiveSection, loading };
};
