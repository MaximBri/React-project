import { Link } from 'react-router-dom';

import { Header } from '@/app/layouts/header';
import { routes } from '@/app/routes/model/routes';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className={`container ${styles['not-found__wrapper']}`}>
        <h1 className={styles['not-found__title']}>
          Этой страницы не существует
        </h1>
        <Link className="button" to={routes.main.home.path}>
          Вернуться на главную
        </Link>
      </div>
    </>
  );
};
