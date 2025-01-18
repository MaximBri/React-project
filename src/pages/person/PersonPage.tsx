import { personPageModel } from './model/personPageModel';
import { sections } from './model/Sections';

import styles from './PersonPage.module.scss';

export const PersonPage = () => {
  const { activeSection, setActiveSection, loading } = personPageModel();
  return (
    <>
      {!loading ? (
        <>
          <h2 className={styles.person__title}>Личный кабинет</h2>
          <ul className={styles.person__list}>
            <li
              onClick={() => setActiveSection(0)}
              className={`${styles['person__list-item']} ${
                !activeSection ? styles['person__list-item--active'] : ''
              }`}
            >
              Что-то
            </li>
            <li
              onClick={() => setActiveSection(1)}
              className={`${styles['person__list-item']} ${
                activeSection === 1 ? styles['person__list-item--active'] : ''
              }`}
            >
              Анкета
            </li>
          </ul>
        </>
      ) : (
        <h2 className={styles.person__loading}>Загрузка...</h2>
      )}
      {!loading && sections[activeSection]}
    </>
  );
};
