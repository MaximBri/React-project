import { memo, useState } from 'react';

import { FieldWithSelectsEtranceData } from '@/shared/types';
import styles from './FieldWithSelects.module.scss';

export const FieldWithSelects = memo(
  ({
    title,
    value,
    setValue,
    variants,
    fieldName,
  }: FieldWithSelectsEtranceData) => {
    const [open, setOpen] = useState<boolean>(false);
    const changeSeason = (text: string) => {
      setOpen(false);
      setValue(fieldName, text);
    };
    return (
      <span className={styles.field}>
        <h3 className={styles.field__title}>{title}:</h3>
        <div
          onClick={() => setOpen(!open)}
          onMouseLeave={() => setOpen(false)}
          className={styles.field__wrapper}
        >
          <button
            className={`${styles.field__button} ${open ? styles['field__button-not-rounded'] : ''}`}
          >
            {value || 'Ничего не выбрано'}
          </button>
          {open && (
            <div className={styles.field__variants}>
              {variants.map((item, i) => {
                if (item !== value)
                  return (
                    <span
                      className={styles.field__variant}
                      onClick={() => changeSeason(item)}
                      key={i}
                    >
                      {item}
                    </span>
                  );
              })}
            </div>
          )}
        </div>
      </span>
    );
  }
);
