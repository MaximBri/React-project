import { generalSettingsModel } from './model/generalSettingsModel';
import styles from './GeneralSettings.module.scss';
import {
  BirthdaySetting,
  DeleteQuestionnaire,
  ExitFromAccount,
  NicknameSetting,
  SaveMainSettings,
} from '@/features/settings/general';

export const GeneralSettings = () => {
  const {
    exitFromAcc,
    name,
    onChangeName,
    needSave,
    onChangeBirthday,
    birthday,
    canSave,
    saveData,
    error,
  } = generalSettingsModel();
  return (
    <div className={styles.settings}>
      <NicknameSetting name={name} setName={onChangeName} error={error.name} />
      <BirthdaySetting
        birthday={birthday}
        setBirthday={onChangeBirthday}
        error={error.birthday}
      />
      <SaveMainSettings
        canSave={canSave}
        needSave={needSave}
        saveData={saveData}
      />
      <div className={styles.settings__separator}></div>
      <DeleteQuestionnaire />
      <ExitFromAccount exitFromAcc={exitFromAcc} />
    </div>
  );
};
