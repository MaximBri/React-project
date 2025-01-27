import { memo } from 'react';

import { FieldEtranceData } from '../../../shared/types';
import styles from './Field.module.scss';

export const Field = memo(
  ({
    title,
    value,
    setValue,
    placeholder = '',
    fieldName,
  }: FieldEtranceData) => {
    return (
      <label className={styles.field}>
        <h3 className={styles.field__title}>{title}:</h3>
        <input
          value={value}
          onChange={(e) => setValue(fieldName, e.target.value)}
          className={styles.field__input}
          type="text"
          placeholder={placeholder}
        />
      </label>
    );
  }
);
