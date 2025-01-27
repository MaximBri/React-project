import { memo } from 'react';
import styles from './NicknameSetting.module.scss';

export interface NicknameSettingInterface {
  name: string;
  setName: (text: string) => void;
  error?: string;
}

export const NicknameSetting = memo(({
  name,
  setName,
  error,
}: NicknameSettingInterface) => {
  return (
    <div className={styles.name}>
      <h3 className={styles.name__title}>Никнейм:</h3>
      <div className={styles.name__wrapper}>
        <input
          className={styles.name__input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nickname"
        ></input>
        <span
          className={`${styles.name__error} ${error ? '' : styles['name__error--disabled']}`}
        >
          {error}
        </span>
      </div>
    </div>
  );
});
