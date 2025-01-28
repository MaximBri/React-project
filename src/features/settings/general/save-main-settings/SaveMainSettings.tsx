import { memo } from 'react';
import styles from './SaveMainSettings.module.scss';

export interface SaveMainSettingsProps {
  needSave: boolean;
  canSave: boolean;
  saveData: () => void;
}

export const SaveMainSettings = memo(({
  needSave,
  canSave,
  saveData,
}: SaveMainSettingsProps) => {
  return (
    <div
      className={`${styles.save} ${needSave ? '' : styles['save--disabled']}`}
    >
      <button
        onClick={() => saveData()}
        className={`${styles.save__button} ${canSave ? styles['save__button--active'] : ''}`}
        disabled={!canSave}
      >
        Сохранить
      </button>
    </div>
  );
});
