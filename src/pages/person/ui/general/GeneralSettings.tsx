import { generalSettingsModel } from './model/generalSettingsModel';
import styles from './GeneralSettings.module.scss';

export const GeneralSettings = () => {
  const { exitFromAcc } = generalSettingsModel();
  return (
    <button onClick={() => exitFromAcc()} className={styles['user__about-btn']}>
      Выйти
    </button>
  );
};
