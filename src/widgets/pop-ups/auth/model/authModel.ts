import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';

import useAuthLogic from '@/entities/user/authorization/authLogic';
import { PREV_PAGE } from '@/shared/globals/globalsData';
import { routes } from '@/app/routes/model/routes';
import {
  setAuthWindow,
  setRegisterWindow,
} from '@/app/store/slices/WindowsSlice';

export const authModel = (
  dispatch: Dispatch<UnknownAction>,
  navigate: NavigateFunction
) => {
  const [stateAuthErr, setStateAuthErr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [authMess, setAuthMess] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const { entance } = useAuthLogic({
    login,
    pass,
    setLoading,
    setAuthMess,
    setStateAuthErr,
  });

  const openRegWindow = () => {
    dispatch(setRegisterWindow(true));
    dispatch(setAuthWindow(false));
  };

  const closeWindows = () => {
    dispatch(setRegisterWindow(false));
    dispatch(setAuthWindow(false));
  };

  const returnBack = () => {
    let prevUrl = localStorage.getItem(PREV_PAGE) || routes.main.home.path;
    if (prevUrl === 'Authorization') prevUrl = routes.main.home.path;
    navigate('/' + prevUrl);
  };

  return {
    stateAuthErr,
    loading,
    authMess,
    login,
    setLogin,
    pass,
    setPass,
    entance,
    openRegWindow,
    closeWindows,
    returnBack,
  };
};
