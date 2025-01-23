import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

import { routes } from '@/app/routes/model/routes';
import { PREV_PAGE } from '@/shared/globals/globalsData';
import { stateRegErrInterface } from '@/shared/types';
import useRegisterLogic from '@/entities/user/registration/registerLogic';
import {
  setAuthWindow,
  setRegisterWindow,
} from '@/app/store/slices/WindowsSlice';

export const registerModel = (
  dispatch: Dispatch<UnknownAction>,
  navigate: NavigateFunction
) => {
  const [stateRegErr, setStateRegErr] = useState<stateRegErrInterface>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [regMess, setRegMess] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const { register, name, setName, repeatPass, setRepeatPass } =
    useRegisterLogic({ login, pass, setLoading, setRegMess, setStateRegErr });
  const closeWindows = () => {
    dispatch(setRegisterWindow(false));
    dispatch(setAuthWindow(false));
  };
  const openAuthWindow = () => {
    dispatch(setRegisterWindow(false));
    dispatch(setAuthWindow(true));
  };
  const returnBack = () => {
    const prevUrl = localStorage.getItem(PREV_PAGE) || routes.main.home.path;
    navigate('/' + prevUrl);
  };
  return {
    loading,
    regMess,
    stateRegErr,
    name,
    setName,
    login,
    setLogin,
    pass,
    setPass,
    repeatPass,
    setRepeatPass,
    openAuthWindow,
    closeWindows,
    register,
    returnBack,
  };
};
