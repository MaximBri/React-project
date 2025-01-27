import { memo } from 'react';
import { personPageModel } from './model/personPageModel';
import { sectionsInUserCabinet } from './model/Sections';

import styles from './PersonPage.module.scss';

export const PersonPage = memo(() => {
  const { activeSection, setActiveSection, loading } = personPageModel();
  return (
    <>
      {!loading ? (
        <>
          <h2 className={styles.person__title}>Личный кабинет</h2>
          <div className={styles.person__body}>
            <nav className={styles.person__list}>
              <div className={styles['person__list-decor']}></div>
              {sectionsInUserCabinet.map((section, index) => {
                return (
                  <button
                    type="button"
                    className={`${styles['person__list-item']} ${index === activeSection ? styles['person__list-item--active'] : ''}`}
                    onClick={() => setActiveSection(index)}
                    key={index}
                  >
                    {section.name}
                    <svg
                      width="7"
                      height="12"
                      viewBox="0 0 7 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.255855 1.6252L4.33871 6.00019L0.255855 10.3752C-0.00462099 10.6542 -0.0716633 11.0312 0.0799817 11.364C0.231627 11.6969 0.578921 11.9352 0.991041 11.989C1.40316 12.0429 1.8175 11.9042 2.07797 11.6252L6.74409 6.62519C7.0853 6.25986 7.0853 5.74052 6.74409 5.37519L2.07797 0.375205C1.67531 -0.0561275 0.940998 -0.125972 0.437833 0.219206C-0.0653311 0.564383 -0.146806 1.19387 0.255855 1.6252Z"
                        fill="#1F2D3D"
                      />
                    </svg>
                  </button>
                );
              })}
              <div className={styles['person__list-decor']}></div>
            </nav>
            <div className={styles.person__section}>
              {!loading && sectionsInUserCabinet[activeSection].content}
            </div>
          </div>
        </>
      ) : (
        <h2 className={styles.person__loading}>Загрузка...</h2>
      )}
    </>
  );
});
