import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { routes } from '@/app/routes/model/routes';
import { useHeaderModel } from '../model/useHeaderModel';
import { NavigationList } from '@/app/routes/ui/NavigationList';
import { setCatWindow } from '../../../store/slices/WindowsSlice';

import CatImage from '@/pages/cat/ui/CatImage';
import { BurgerMenu } from '../../burger-menu';

import logo from '/img/logo192.png';
import regSvg from '/img/Person.svg';
import styles from './Header.module.scss';

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, catExisting, userName, onAuthButtonClick } =
  useHeaderModel();
  console.log(catExisting)
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
          <BurgerMenu />
          {auth ? (
            <>
              {!catExisting && (
                <button
                  onClick={() => dispatch(setCatWindow(true))}
                  className={styles['header__nav-cat']}
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
              onClick={() => onAuthButtonClick()}
              className={styles['header__nav-item']}
            >
              <img src={regSvg} alt="Вход" />
              <h4>Вход / Регистрация</h4>
            </span>
          )}
        </div>
      </header>
    </>
  );
};
