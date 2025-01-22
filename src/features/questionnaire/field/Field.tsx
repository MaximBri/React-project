import { memo } from 'react';

import { FieldEtranceData } from '../../../shared/types';
import styles from './Field.module.scss';

export const Field = memo(
  ({
    title,
    value,
    setValue,
    canChangeInput,
    placeholder,
  }: FieldEtranceData) => {
    return (
      <label className={styles.field__title}>
        {title}:
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`${styles['field__about-item']}
            ${canChangeInput ? '' : styles['field__about-item--blocked']}`}
          type="text"
          placeholder={placeholder}
          readOnly={!canChangeInput}
        />
      </label>
    );
  }
);
