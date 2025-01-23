import { memo, useState } from 'react';

import { NavigationList } from '@/app/routes/ui/NavigationList';
import styles from './BurgerMenu.module.scss';

export const BurgerMenu = memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className={styles.burger}>
        <div></div>
        <div></div>
        <div></div>
      </button>
      <nav
        className={
          isOpen
            ? styles.burger__menu
            : `${styles.burger__menu} ${styles['burger__menu--hidden']}`
        }
      >
        <button
          onClick={() => setIsOpen(false)}
          className={styles['burger__close-btn']}
        >
          <div></div>
          <div></div>
        </button>
        <nav className={styles['burger-inner']}>
          <NavigationList closeBurger={setIsOpen}/>
        </nav>
      </nav>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className={styles.burger__background}
        ></div>
      )}
    </>
  );
});
