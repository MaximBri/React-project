import styles from './BirthdaySetting.module.scss';

export interface BirthdaySettingInterface {
  birthday: string;
  setBirthday: (text: string) => void;
  error?: string;
}

export const BirthdaySetting = ({
  birthday,
  setBirthday,
  error,
}: BirthdaySettingInterface) => {
  return (
    <div className={styles.birthday}>
      <h3 className={styles.birthday__title}>Дата рождения:</h3>
      <div className={styles.birthday__wrapper}>
        <input
          className={styles.birthday__input}
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          placeholder="01.01.2000"
        ></input>
        <span className={`${styles.birthday__error} ${error ? '' : styles['birthday__error--disabled']}`}>{error}</span>
      </div>
    </div>
  );
};
