import React from 'react';
import { useDispatch } from 'react-redux';

import useRegisterLogic from '../../../entities/user/registration/registerLogic';
import {
  setAuthWindow,
  setRegisterWindow,
} from '../../../app/store/slices/WindowsSlice';
import crossSvg from '/img/attention.svg';
import LoadGif from '/img/loader.gif';
import styles from './Register.module.scss';
import { messages } from '@/entities/user/authorization/model/messagesForUser';

export const Register = () => {
  const dispatch = useDispatch();
  const [stateAuthErr, setStateAuthErr] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [authMess, setAuthMess] = React.useState<string>('');
  const [login, setLogin] = React.useState<string>('');
  const [pass, setPass] = React.useState<string>('');
  const { register, name, setName, repeatPass, setRepeatPass } =
    useRegisterLogic({ login, pass, setLoading, setAuthMess, setStateAuthErr });
  const closeWindows = () => {
    dispatch(setRegisterWindow(false));
    dispatch(setAuthWindow(false));
  };
  const openAuthWindow = () => {
    dispatch(setRegisterWindow(false));
    dispatch(setAuthWindow(true));
  };
  return (
    <>
      <section className={styles.registration}>
        <h2 className={styles.registration__title}>Регистрация</h2>
        {loading && (
          <div className={styles['registration__status-loading']}>
            <img src={LoadGif} alt="loading..." />
            <h2 className="registration_success_text">{messages[1]}</h2>
          </div>
        )}
        {authMess && (
          <div className={styles['registration__status-success']}>
            <h2 className="registration_success_text">{authMess}</h2>
          </div>
        )}
        {stateAuthErr && (
          <div className={styles['registration__status-error']}>
            <img src={crossSvg} alt="Ошибка" />
            <h2 className="registration_success_text">{stateAuthErr}</h2>
          </div>
        )}
        <div className={styles.registration__form}>
          Имя
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className={styles['registration__form-input']}
            placeholder="Имя"
            required
          />
          Логин
          <input
            onChange={(e) => setLogin(e.target.value)}
            value={login}
            type="text"
            className={styles['registration__form-input']}
            placeholder="Логин"
            required
          />
          Пароль
          <input
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            type="password"
            className={styles['registration__form-input']}
            placeholder="Пароль"
            autoComplete="current-password"
            required
          />
          Повторите пароль
          <input
            onChange={(e) => setRepeatPass(e.target.value)}
            value={repeatPass}
            type="password"
            className={styles['registration__form-input']}
            placeholder="Повторите пароль"
            autoComplete="current-password"
            required
          />
          <button
            onClick={(e) => register(e)}
            className={styles['registration__form-btn']}
          >
            Зарегистрироваться
          </button>
          <h3
            className={styles.registration__entrance}
            onClick={() => openAuthWindow()}
          >
            Уже есть аккаунт?<span> Войти</span>
          </h3>
        </div>
      </section>
      <div
        onClick={() => closeWindows()}
        className={styles.registration__background}
      ></div>
    </>
  );
};
