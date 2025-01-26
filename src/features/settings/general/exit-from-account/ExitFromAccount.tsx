import styles from './ExitFromAccount.module.scss';

export const ExitFromAccount = ({
  exitFromAcc,
}: {
  exitFromAcc: () => void;
}) => {
  return (
    <div className={styles.exit}>
      <h3 className={styles.exit__title}>Выйти из аккаунта</h3>
      <button onClick={() => exitFromAcc()} className={styles.exit__button}>
        Выйти
      </button>
    </div>
  );
};
