import { useDispatch } from 'react-redux';
import { useState } from 'react';

import crossSvg from '/img/attention.svg';
import LoadGif from '/img/loader.gif';
import {
  setAuthWindow,
  setRegisterWindow,
} from '@/app/store/slices/WindowsSlice';
import useAuthLogic from '@/entities/user/authorization/authLogic';
import styles from './Auth.module.scss';
import { messages } from '@/entities/user/authorization/model/messagesForUser';

export const Auth = () => {
  const dispatch = useDispatch();
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

  return (
    <>
      <section className={styles.auth}>
        <h2 className={styles.auth__title}>Вход</h2>
        {/* попробовать сделать это через map */}
        {loading && (
          <div className={styles['auth__status-loading']}>
            <img src={LoadGif} alt="loading..." />
            <h2 className={styles['auth__success-text']}>{messages[1]}</h2>
          </div>
        )}
        {authMess && (
          <div className={styles['auth__status-success']}>
            <h2 className={styles['auth__success-text']}>{authMess}</h2>
          </div>
        )}
        {stateAuthErr && (
          <div className={styles['auth__status-error']}>
            <img src={crossSvg} alt="Ошибка" />
            <h2 className={styles['auth__success-text']}>{stateAuthErr}</h2>
          </div>
        )}
        <form className={styles.auth__form}>
          Логин
          <input
            onChange={(e) => setLogin(e.target.value)}
            value={login}
            type="text"
            className={styles['auth__form-input']}
            placeholder="Введите ваш логин"
            required
          />
          Пароль
          <input
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            type="password"
            className={styles['auth__form-input']}
            placeholder="Пароль"
            autoComplete="current-password"
            required
          />
          <button
            onClick={(e) => entance(e)}
            className={styles['auth__form-btn']}
          >
            Войти
          </button>
          <h3 className={styles.auth__registr} onClick={() => openRegWindow()}>
            Ещё нет аккаунта?<span> Зарегистрироваться</span>
          </h3>
        </form>
      </section>
      <div
        onClick={() => closeWindows()}
        className={styles.auth__background}
      ></div>
    </>
  );
};
