import { FC } from 'react';

import { pieInterface } from '@/entities/pies/model/piesSlice';
import styles from './Pie.module.scss';

export const Pie: FC<{ data: pieInterface }> = ({ data }) => {
  let addClass;
  if (data.rarity.rare === 'Обычный') addClass = styles.pie__simple;
  else if (data.rarity.rare === 'Необычный') addClass = styles.pie__unusual;
  else addClass = styles.pie__rare;
  return (
    <li className={`${styles.pie} ${addClass}`}>
      <h3 className={styles.pie__name}>{data.name}</h3>
      <img
        className={styles.pie__image}
        src={`https://${data.imgLink}`}
        alt="pie"
      ></img>
      <div className={styles.pie__rarity}>{data.rarity.rare}</div>
      <p className={styles.pie__description}>{data.description}</p>
    </li>
  );
};
