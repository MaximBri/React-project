import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { useRef, useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useAuthLogic from '@/entities/user/authorization/authLogic';
import { PREV_PAGE } from '@/shared/globals/globalsData';
import { routes } from '@/shared/config/routes';
import {
  getInProcess,
  setAuthWindow,
  setInProcess,
  setRegisterWindow,
} from '@/app/store/slices/WindowsSlice';
import styles from '../../shared/AuthAndRegister.module.scss';

export const authModel = (
  dispatch: Dispatch<UnknownAction>,
  navigate: NavigateFunction
) => {
  const [stateAuthErr, setStateAuthErr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [authMess, setAuthMess] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const background = useRef<HTMLDivElement>(null);
  const popUpRef = useRef<HTMLElement>(null);
  const fromRegister = useSelector(getInProcess);
  const { entance } = useAuthLogic({
    login,
    pass,
    setLoading,
    setAuthMess,
    setStateAuthErr,
  });

  const openRegWindow = () => {
    if (popUpRef.current) {
      popUpRef.current.classList.remove(styles['window--animated']);
      popUpRef.current.classList.add(styles['window--hidden']);
    }
    setTimeout(() => {
      dispatch(setRegisterWindow(true));
      dispatch(setAuthWindow(false));
      dispatch(setInProcess(true));
    }, 150);
  };

  const closeWindows = () => {
    if (popUpRef.current && background.current) {
      popUpRef.current.classList.remove(styles['window--animated']);
      popUpRef.current.classList.add(styles['window--hidden']);
      background.current.classList.remove(
        styles['window__background--animated']
      );
      background.current.classList.add(styles['window__background--hidden']);
    }
    setTimeout(() => {
      dispatch(setRegisterWindow(false));
      dispatch(setAuthWindow(false));
      dispatch(setInProcess(false));
    }, 150);
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
    popUpRef,
    background,
    fromRegister,
  };
};
