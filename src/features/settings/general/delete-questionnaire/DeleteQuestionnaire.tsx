import { FC, memo } from 'react';

import styles from './DeleteQuestionnaire.module.scss';

export const DeleteQuestionnaire: FC<{
  deleteData: () => void;
}> = memo(({ deleteData }) => {
  return (
    <div className={styles.delete}>
      <div className={styles.delete__body}>
        <h3 className={styles['delete__body-title']}>Удалить данные о себе</h3>
        <h4 className={styles['delete__body-subtitle']}>
          Их нельзя будет восстановить
        </h4>
      </div>
      <button onClick={() => deleteData()} className={styles.delete__button}>
        Удалить
      </button>
    </div>
  );
});
