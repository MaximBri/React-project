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
        fieldName={'season'}
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
      <label className={styles['about__textarea-wrapper']}>
        Мечтаю о
        <textarea
          value={other.dream}
          onChange={(e) => onDataChange('dream', e.target.value)}
          className={styles['about__textarea']}
        />
      </label>
      <div className={styles['about__button-wrapper']}>
        <button
          className={`${styles.about__button} ${needSave ? styles['about__button--active'] : ''}`}
          onClick={() => saveUserDataProvider()}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};
