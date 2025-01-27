import styles from './DeleteQuestionnaire.module.scss';

export const DeleteQuestionnaire = () => {
  return (
    <div className={styles.delete}>
      <div className={styles.delete__body}>
        <h3 className={styles['delete__body-title']}>Удалить данные о себе</h3>
        <h4 className={styles['delete__body-subtitle']}>
          Их нельзя будет восстановить
        </h4>
      </div>
      <button className={styles.delete__button}>Удалить</button>
    </div>
  );
};
