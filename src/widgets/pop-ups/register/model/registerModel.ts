import { useRef, useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { routes } from '@/shared/config/routes';
import { PREV_PAGE } from '@/shared/globals/globalsData';
import { stateRegErrInterface } from '@/shared/types';
import useRegisterLogic from '@/entities/user/registration/registerLogic';
import {
  getInProcess,
  setAuthWindow,
  setInProcess,
  setRegisterWindow,
} from '@/app/store/slices/WindowsSlice';
import styles from '../../shared/AuthAndRegister.module.scss';

export const registerModel = (
  dispatch: Dispatch<UnknownAction>,
  navigate: NavigateFunction
) => {
  const [stateRegErr, setStateRegErr] = useState<stateRegErrInterface>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [regMess, setRegMess] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const background = useRef<HTMLDivElement>(null);
  const popUpRef = useRef<HTMLElement>(null);
  const fromRegister = useSelector(getInProcess);
  const { register, name, setName, repeatPass, setRepeatPass } =
    useRegisterLogic({ login, pass, setLoading, setRegMess, setStateRegErr });

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

  const openAuthWindow = () => {
    if (popUpRef.current) {
      popUpRef.current.classList.remove(styles['window--animated']);
      popUpRef.current.classList.add(styles['window--hidden']);
    }
    setTimeout(() => {
      dispatch(setRegisterWindow(false));
      dispatch(setAuthWindow(true));
    }, 150);
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
    background,
    popUpRef,
    fromRegister,
  };
};
