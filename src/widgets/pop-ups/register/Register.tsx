import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { messages } from '@/entities/user/authorization/model/messagesForUser';
import { registerModel } from './model/registerModel';
import crossSvg from '/img/attention.svg';
import styles from '../shared/AuthAndRegister.module.scss';

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = registerModel(dispatch, navigate);
  return (
    <>
      <section className={styles.window}>
        <h2 className={styles.window__title}>Регистрация</h2>
        <div className={`${styles['window__status-loading']} ${data.loading ? styles['window__status-loading--active'] : ''}`}>
          <h2 className={styles['window__status-text']}>{messages[1]}</h2>
        </div>
        {data.regMess && (
          <div className={styles['window__status-success']}>
            <h2 className={styles['window__status-text']}>{data.regMess}</h2>
          </div>
        )}
        {data.stateRegErr.other && (
          <div className={styles['window__status-error']}>
            <img src={crossSvg} alt="Ошибка" />
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
            onClick={() => data.openAuthWindow()}
          >
            Уже есть аккаунт?<span> Войти</span>
          </h3>
        </div>
      </section>
      <div
        onClick={() => data.closeWindows()}
        className={styles.window__background}
      ></div>
    </>
  );
};
