import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { routes } from '../model/routes';
import { getAuth } from '@/app/store/slices/AuthSlice';
import { getExisting } from '@/app/store/slices/CatSlice';
import styles from './NavigationList.module.scss';

export const NavigationList = ({ closeBurger }: any) => {
  const auth = useSelector<any, boolean>(getAuth);
  const catExisting = useSelector(getExisting);
  return (
    <>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : '')}
        onClick={() => closeBurger(false)}
        to={routes.main.catalog.path}
      >
        {routes.main.catalog.name}
      </NavLink>

      {auth && (
        <>
          {catExisting && (
            <NavLink
              onClick={() => closeBurger(false)}
              className={({ isActive }) => (isActive ? styles.active : '')}
              to={routes.main.cat.path}
            >
              {routes.main.cat.name}
            </NavLink>
          )}
          <NavLink
            onClick={() => closeBurger(false)}
            className={({ isActive }) => (isActive ? styles.active : '')}
            to={routes.main.account.path}
          >
            {routes.main.account.name}
          </NavLink>
          <NavLink
            onClick={() => closeBurger(false)}
            className={({ isActive }) => (isActive ? styles.active : '')}
            to={routes.main.profile.path}
          >
            {routes.main.profile.name}
          </NavLink>
        </>
      )}
      <NavLink
        onClick={() => closeBurger(false)}
        className={({ isActive }) => (isActive ? styles.active : '')}
        to={routes.main.about.path}
      >
        {routes.main.about.name}
      </NavLink>
    </>
  );
};
