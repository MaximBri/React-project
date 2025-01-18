import { useState } from 'react';

import { NavigationList } from '@/app/routes/ui/NavigationList';
import styles from './BurgerMenu.module.scss';

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div onClick={() => setIsOpen(true)} className={styles.burger}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <nav
        className={
          isOpen
            ? styles.burger__menu
            : `${styles.burger__menu} ${styles['burger__menu--hidden']}`
        }
      >
        <div
          onClick={() => setIsOpen(false)}
          className={styles['burger__close-btn']}
        >
          <div></div>
          <div></div>
        </div>
        <nav className={styles['burger-inner']}>
          <NavigationList />
        </nav>
      </nav>
    </>
  );
};
