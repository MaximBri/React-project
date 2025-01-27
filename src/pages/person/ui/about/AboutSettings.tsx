import { useDispatch } from 'react-redux';

import { questionnaireMainFields } from './model/questionnaireMainFields';
import { Field, FieldWithSelects } from '@/features/questionnaire';
import { aboutSettingsModel } from './model/aboutSettingsModel';
import styles from './AboutSettings.module.scss';

export const AboutSettings = () => {
  const dispatch = useDispatch();

  const { saveUserDataProvider, onDataChange, needSave, other } =
    aboutSettingsModel({ dispatch });
  return (
    <div className={styles.about}>
      <h2 className={styles.about__title}>Расскажите о себе</h2>
      <FieldWithSelects
        title="Любимый сезон"
        value={other.season || 'Ничего не выбрано'}
        fieldName={"season"}
        setValue={onDataChange}
        variants={['Зима', 'Весна', 'Лето', 'Осень']}
      />
      <div className={styles.about__list}>
        {questionnaireMainFields.map((field, index) => {
          return (
            <Field
              value={other[field.key] ?? ''}
              setValue={onDataChange}
              fieldName={field.key}
              title={field.title}
              key={index}
            ></Field>
          );
        })}
      </div>
      {needSave && (
        <div className={styles['about__button-wrapper']}>
          <button
            className={styles.about__button}
            onClick={() => saveUserDataProvider()}
          >
            Сохранить
          </button>
        </div>
      )}
      {/* <FieldWithSelects
          title="Любимый сезон"
          value={season || 'Зима'}
          setValue={setSeason}
          canChangeInput={canChangeInput}
          variants={['Зима', 'Весна', 'Лето', 'Осень']}
        />
        <label className={styles['person__other-textarea-wrapper']}>
          Мечтаю о ...
          <textarea
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            className={
              canChangeInput
                ? styles['person__about-item-textarea']
                : `${styles['person__about-item-textarea']} ${styles['person__about-item-textarea--blocked']}`
            }
            readOnly={!canChangeInput}
          />
        </label> */}
    </div>
  );
};
