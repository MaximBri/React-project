import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authModel } from '@/widgets/pop-ups/auth/model/authModel';
import { messages } from '@/entities/user/authorization/model/messagesForUser';
import LoadGif from '/img/loader.gif';
import crossSvg from '/img/attention.svg';
import styles from './AuthorizationPage.module.scss';
import { routes } from '@/app/routes/model/routes';

export const AuthorizationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    loading,
    authMess,
    stateAuthErr,
    login,
    setLogin,
    pass,
    setPass,
    entance,
    returnBack,
  } = authModel(dispatch, navigate);

  return (
    <section className={styles.window}>
      <button onClick={() => returnBack()} className={styles.window__subtitle}>
        <svg
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          width="48px"
          height="48px"
          viewBox="0 0 24 24"
          aria-labelledby="returnIconTitle returnIconDesc"
          stroke="#2329D6"
          strokeWidth="1"
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
          color="#2329D6"
        >
          <path d="M19,8 L19,11 C19,12.1045695 18.1045695,13 17,13 L6,13" />{' '}
          <polyline points="8 16 5 13 8 10" />
        </svg>
        Вернуться
      </button>
      <h2 className={styles.window__title}>Вход</h2>
      {loading && (
        <div className={styles['window__status-loading']}>
          <img src={LoadGif} alt="loading..." />
          <h2 className={styles['window__success-text']}>{messages[1]}</h2>
        </div>
      )}
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
          onClick={() => navigate(routes.main.reg.path)}
        >
          Ещё нет аккаунта?<span> Зарегистрироваться</span>
        </h3>
      </form>
    </section>
  );
};
