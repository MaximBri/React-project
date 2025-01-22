import React from 'react';
import { useDispatch } from 'react-redux';

import useRegisterLogic from '../../../entities/user/registration/registerLogic';
import {
  setAuthWindow,
  setRegisterWindow,
} from '../../../app/store/slices/WindowsSlice';
import crossSvg from '/img/attention.svg';
import LoadGif from '/img/loader.gif';
import { messages } from '@/entities/user/authorization/model/messagesForUser';
import styles from '../shared/AuthAndRegister.module.scss';
import { stateRegErrInterface } from '@/shared/types';

export const Register = () => {
  const dispatch = useDispatch();
  const [stateRegErr, setStateRegErr] = React.useState<stateRegErrInterface>(
    {}
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [regMess, setRegMess] = React.useState<string>('');
  const [login, setLogin] = React.useState<string>('');
  const [pass, setPass] = React.useState<string>('');
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
  return (
    <>
      <section className={styles.window}>
        <h2 className={styles.window__title}>Регистрация</h2>
        {loading && (
          <div className={styles['window__status-loading']}>
            <img src={LoadGif} alt="loading..." />
            <h2 className={styles['window__status-text']}>{messages[1]}</h2>
          </div>
        )}
        {regMess && (
          <div className={styles['window__status-success']}>
            <h2 className={styles['window__status-text']}>{regMess}</h2>
          </div>
        )}
        {stateRegErr.other && (
          <div className={styles['window__status-error']}>
            <img src={crossSvg} alt="Ошибка" />
            <h2 className={styles['window__status-text']}>
              {stateRegErr.other}
            </h2>
          </div>
        )}
        <div className={styles.window__form}>
          Имя
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className={styles['window__form-input']}
            placeholder="Имя"
            required
          />
          {stateRegErr.name && (
            <h2 className={styles['window__status-error--under']}>
              {stateRegErr.name}
            </h2>
          )}
          Логин
          <input
            onChange={(e) => setLogin(e.target.value)}
            value={login}
            type="text"
            className={styles['window__form-input']}
            placeholder="Логин"
            required
          />
          {stateRegErr.login && (
            <h2 className={styles['window__status-error--under']}>
              {stateRegErr.login}
            </h2>
          )}
          Пароль
          <input
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            type="password"
            className={styles['window__form-input']}
            placeholder="Пароль"
            autoComplete="current-password"
            required
          />
          {stateRegErr.pass && (
            <h2 className={styles['window__status-error--under']}>
              {stateRegErr.pass}
            </h2>
          )}
          Повторите пароль
          <input
            onChange={(e) => setRepeatPass(e.target.value)}
            value={repeatPass}
            type="password"
            className={styles['window__form-input']}
            placeholder="Повторите пароль"
            autoComplete="current-password"
            required
          />
          <button
            onClick={(e) => register(e)}
            className={styles['window__form-btn']}
          >
            Зарегистрироваться
          </button>
          <h3
            className={styles.window__entrance}
            onClick={() => openAuthWindow()}
          >
            Уже есть аккаунт?<span> Войти</span>
          </h3>
        </div>
      </section>
      <div
        onClick={() => closeWindows()}
        className={styles.window__background}
      ></div>
    </>
  );
};
