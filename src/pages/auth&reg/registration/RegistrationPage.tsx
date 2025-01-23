import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { messages } from '@/entities/user/authorization/model/messagesForUser';
import { registerModel } from '@/widgets/pop-ups/register/model/registerModel';
import { routes } from '@/app/routes/model/routes';
import LoadGif from '/img/loader.gif';
import CrossSvg from '/img/attention.svg';
import styles from '../authorization/AuthorizationPage.module.scss';

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = registerModel(dispatch, navigate);

  return (
    <>
      <section className={styles.window}>
        <button
          onClick={() => data.returnBack()}
          className={styles.window__subtitle}
        >
          <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            width="48px"
            height="48px"
            viewBox="0 0 24 24"
            aria-labelledby="returnIconTitle returnIconDesc"
            stroke="#2329D6"
            stroke-width="1"
            stroke-linecap="square"
            stroke-linejoin="miter"
            fill="none"
            color="#2329D6"
          >
            <path d="M19,8 L19,11 C19,12.1045695 18.1045695,13 17,13 L6,13" />{' '}
            <polyline points="8 16 5 13 8 10" />
          </svg>
          Вернуться
        </button>
        <h2 className={styles.window__title}>Регистрация</h2>
        {data.loading && (
          <div className={styles['window__status-loading']}>
            <img src={LoadGif} alt="loading..." />
            <h2 className={styles['window__status-text']}>{messages[1]}</h2>
          </div>
        )}
        {data.regMess && (
          <div className={styles['window__status-success']}>
            <h2 className={styles['window__status-text']}>{data.regMess}</h2>
          </div>
        )}
        {data.stateRegErr.other && (
          <div className={styles['window__status-error']}>
            <img src={CrossSvg} alt="Ошибка" />
            <h2 className={styles['window__status-text']}>
              {data.stateRegErr.other}
            </h2>
          </div>
        )}
        <div className={styles.window__form}>
          Имя
          <input
            onChange={(e) => data.setName(e.target.value)}
            value={data.name}
            type="text"
            className={styles['window__form-input']}
            placeholder="Имя"
            required
          />
          {data.stateRegErr.name && (
            <h2 className={styles['window__status-error--under']}>
              {data.stateRegErr.name}
            </h2>
          )}
          Логин
          <input
            onChange={(e) => data.setLogin(e.target.value)}
            value={data.login}
            type="text"
            className={styles['window__form-input']}
            placeholder="Логин"
            required
          />
          {data.stateRegErr.login && (
            <h2 className={styles['window__status-error--under']}>
              {data.stateRegErr.login}
            </h2>
          )}
          Пароль
          <input
            onChange={(e) => data.setPass(e.target.value)}
            value={data.pass}
            type="password"
            className={styles['window__form-input']}
            placeholder="Пароль"
            autoComplete="current-password"
            required
          />
          {data.stateRegErr.pass && (
            <h2 className={styles['window__status-error--under']}>
              {data.stateRegErr.pass}
            </h2>
          )}
          Повторите пароль
          <input
            onChange={(e) => data.setRepeatPass(e.target.value)}
            value={data.repeatPass}
            type="password"
            className={styles['window__form-input']}
            placeholder="Повторите пароль"
            autoComplete="current-password"
            required
          />
          <button
            onClick={(e) => data.register(e)}
            className={styles['window__form-btn']}
          >
            Зарегистрироваться
          </button>
          <h3
            className={styles.window__entrance}
            onClick={() => navigate(routes.main.auth.path)}
          >
            Уже есть аккаунт?<span> Войти</span>
          </h3>
        </div>
      </section>
    </>
  );
};
