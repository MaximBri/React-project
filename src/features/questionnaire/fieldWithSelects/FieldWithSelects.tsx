import { memo, useCallback, useState } from 'react';

import { FieldWithSelectsEtranceData } from '@/shared/types';
import styles from './FieldWithSelects.module.scss';

export const FieldWithSelects = memo(
  ({
    title,
    value,
    setValue,
    canChangeInput,
    variants,
  }: FieldWithSelectsEtranceData) => {
    const [open, setOpen] = useState<boolean>(false);
    const clickOnVariant = useCallback(
      (text: string) => {
        setOpen(!open);
        setValue(text);
      },
      [open]
    );
    const canOpen = () => {
      if (canChangeInput) {
        setOpen(!open);
      }
    };
    return (
      <span className={styles.field}>
        {title}:
        <button
          onClick={() => canOpen()}
          className={`${styles.field__button} ${canChangeInput ? '' : styles['field__button--blocked']}`}
        >
          {value}
          {open && (
            <div className={styles.field__variants}>
              {variants.map((item, i) => {
                if (item !== value)
                  return (
                    <span
                      className={styles.field__variant}
                      onClick={() => clickOnVariant(item)}
                      key={i}
                    >
                      {item}
                    </span>
                  );
              })}
            </div>
          )}
        </button>
      </span>
    );
  }
);
