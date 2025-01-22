import { memo, useState } from 'react';

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
    const clickOnVariant = (text: string) => {
      setOpen(!open);
      setValue(text);
    };
    const canOpen = () => {
      if (canChangeInput) setOpen(!open);
    };
    return (
      <span className="">
        {title}:
        <button
          onClick={() => canOpen()}
          className={`${styles.field} ${canChangeInput ? '' : styles['field--blocked']}`}
        >
          {value}
          {open && (
            <div className="field_variants">
              {variants.map((item, i) => {
                if (item !== value)
                  return (
                    <span
                      className="field_variant"
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
