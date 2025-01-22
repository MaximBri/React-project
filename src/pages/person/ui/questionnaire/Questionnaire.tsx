import { cloneElement } from 'react';
import { useDispatch } from 'react-redux';

import { fieldsBox } from './model/fieldsBox';
import { questionnaireLogic } from './model/questionnaireLogic';
import { FieldWithSelects } from '@/features/questionnaire';
import styles from './Questionnaire.module.scss';

export const Questionnaire = () => {
  const dispatch = useDispatch();

  const { mainFields, fields } = fieldsBox();
  const {
    canChangeInput,
    loading,
    saveUserDataProvider,
    season,
    setSeason,
    dream,
    setDream,
    setCanChangeInput,
    clearUserData,
  } = questionnaireLogic({ dispatch });
  return (
    <section className={styles.person__wrapper}>
      <h2 className={styles['person__top-name']}>
        {canChangeInput ? 'Заполните анкету' : 'Ваши данные'}
      </h2>
      {!loading ? (
        <>
          <section className={styles.person__main}>
            <h3 className={styles['person__main-title']}>Основные</h3>
            <div className={styles.person__about}>
              {mainFields.map((item: any) => {
                return cloneElement(item, { key: item.props.title });
              })}
            </div>
          </section>
          <section className={styles.person__other}>
            <h3 className={styles['person__main-title']}>Дополнительные</h3>
            <div className={styles['person__other-inputs']}>
              {fields.map((item) => {
                return cloneElement(item, { key: item.props.title });
              })}
              <FieldWithSelects
                title="Любимый сезон"
                value={season}
                setValue={setSeason}
                canChangeInput={canChangeInput}
                placeholder=""
                variants={['Зима', 'Весна', 'Лето', 'Осень']}
              />
              <label className={styles['person__other-textarea-wrapper']}>
                Мечтаю о ...
                <textarea
                  value={dream}
                  onChange={(e) => setDream(e.target.value)}
                  className={
                    canChangeInput
                      ? styles['person__about_item-textarea']
                      : `${styles['person__about_item-textarea']} ${styles['person__about_item-textarea--blocked']}`
                  }
                  readOnly={!canChangeInput}
                />
              </label>
            </div>
          </section>
          {canChangeInput ? (
            <div className={styles.person__btn}>
              <button onClick={() => saveUserDataProvider()} className="button">
                Сохранить
              </button>
            </div>
          ) : (
            <div className={styles.person__btn}>
              <button onClick={() => setCanChangeInput(true)} className="button">
                Изменить
              </button>
              <button
                onClick={() => clearUserData()}
                className={styles['person__btn-delete']}
              >
                Удалить анкету
              </button>
            </div>
          )}
        </>
      ) : (
        <h2 className={styles.person__loading}>Загрузка данных...</h2>
      )}
    </section>
  );
};
