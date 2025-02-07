import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

import { messages } from '@/entities/user/authorization/model/messagesForUser';
import { authModel } from './model/authModel';
import crossSvg from '/img/attention.svg';
import styles from '../shared/AuthAndRegister.module.scss';

export const Auth = memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const {
    loading,
    authMess,
    stateAuthErr,
    login,
    setLogin,
    pass,
    setPass,
    entance,
    openRegWindow,
    closeWindows,
    popUpRef,
    background,
    fromRegister,
  } = authModel(dispatch, navigation);

  return (
    <>
      <section
        ref={popUpRef}
        className={`${styles.window} ${styles['window--animated']}`}
      >
        <h2 className={styles.window__title}>Вход</h2>
        <div
          className={`${styles['window__status-loading']} ${loading ? styles['window__status-loading--active'] : ''}`}
        >
          <h2 className={styles['window__success-text']}>{messages[1]}</h2>
        </div>
        {authMess && (
          <div className={styles['window__status-success']}>
            <h2 className={styles['window__success-text']}>{authMess}</h2>
          </div>
        )}
        {stateAuthErr && (
          <div className={styles['window__status-error']}>
            <img src={crossSvg} alt="Ошибка" />
            <h2 className={styles['window__success-text']}>{stateAuthErr}</h2>
          </div>
        )}
        <form className={styles.window__form}>
          Логин
          <input
            onChange={(e) => setLogin(e.target.value)}
            value={login}
            type="text"
            className={styles['window__form-input']}
            placeholder="Введите ваш логин"
            required
          />
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
          <button
            onClick={(e) => entance(e)}
            className={styles['window__form-btn']}
          >
            Войти
          </button>
          <h3
            className={styles.window__entrance}
            onClick={() => openRegWindow()}
          >
            Ещё нет аккаунта?<span> Зарегистрироваться</span>
          </h3>
        </form>
      </section>
      <div
        ref={background}
        onClick={() => closeWindows()}
        className={`${styles.window__background} ${fromRegister ? '' : styles['window__background--animated']}`}
      ></div>
    </>
  );
});
