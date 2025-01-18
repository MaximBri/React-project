import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { routes } from '@/app/routes/model/routes';
import { headerModel } from '../model/headerModel';
import { NavigationList } from '@/app/routes/ui/NavigationList';
import {
  setAuthWindow,
  setCatWindow,
} from '../../../store/slices/WindowsSlice';

import CatImage from '@/pages/cat/ui/CatImage';
import { BurgerMenu } from '../../burger-menu';
import { Auth, CreateCat, Register } from '@/widgets/pop-ups';

import logo from '/img/logo192.png';
import regSvg from '/img/Person.svg';
import styles from './Header.module.scss';

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    auth,
    authWindow,
    registerWindow,
    catWindow,
    catExisting,
    width,
    userName,
  } = headerModel();
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__right}>
          <img
            className={styles.header__logo}
            onClick={() => navigate(routes.main.home.path)}
            src={logo}
            alt="Logo"
          />
          <nav className={styles['header__nav-list']}>
            <NavigationList />
          </nav>
        </div>
        <div className={styles['header__nav-box']}>
          {width < 1024 && <BurgerMenu />}
          {auth ? (
            <>
              {catExisting === false && (
                <button
                  onClick={() => dispatch(setCatWindow(true))}
                  className={styles['header__nav-item']}
                >
                  <CatImage color={null} shadow={false} />
                </button>
              )}
              <div
                onClick={() => navigate(routes.main.profile.path)}
                className={`${styles['header__nav-item']} ${location.pathname === routes.main.profile.path ? styles['header__nav-item--active'] : ''}`}
              >
                <h3 className={styles['header__user-name']}>{userName}</h3>
              </div>
            </>
          ) : (
            <span
              onClick={() => dispatch(setAuthWindow(true))}
              className={styles['header__nav-item']}
            >
              <img src={regSvg} alt="Вход" />
              <h4>Вход / Регистрация</h4>
            </span>
          )}
        </div>
      </header>
      {/* сделать через порталы */}
      {authWindow && <Auth />}
      {registerWindow && <Register />}
      {catWindow && (
        <section className="auth">
          <CreateCat />
        </section>
      )}
    </>
  );
};
