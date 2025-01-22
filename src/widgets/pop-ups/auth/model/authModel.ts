import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { useState } from 'react';
import useAuthLogic from '@/entities/user/authorization/authLogic';
import {
  setAuthWindow,
  setRegisterWindow,
} from '@/app/store/slices/WindowsSlice';

export const authModel = (dispatch: Dispatch<UnknownAction>) => {
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
  };
};
