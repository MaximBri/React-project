import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';

import { createPieModel } from './model/createPieModel';
import { getPies } from '@/entities/pies/model/piesSlice';
import { Pie } from '../pie/Pie';
import pieImg from '/img/pie.png';
import styles from './CreatePie.module.scss';

export const CreatePie = memo(() => {
  const dispatch = useDispatch();
  const pies = useSelector(getPies);
  const { createPie, pieName, setPieName } = createPieModel(dispatch);
  if (pies === null)
    return <h2 className={styles.pie__loading}>Загрузка...</h2>;
  return (
    <section className={styles.pie}>
      <img className={styles.pie__image} src={pieImg} alt="pie"></img>
      <h2 className={styles.pie__title}>Пирожки</h2>
      <form
        className={`${styles.pie__form} ${pieName ? styles['pie__form--active'] : ''}`}
      >
        <input
          className={styles['pie__form-input']}
          value={pieName}
          onChange={(e) => setPieName(e.target.value)}
          placeholder="Название пирожка"
        ></input>
        <button
          type="button"
          className={`${styles['pie__form-button']} ${pieName ? styles['pie__form-button--active'] : ''}`}
          onClick={() => createPie()}
        >
          <span>Сгенерировать пирожок</span>
        </button>
      </form>
      {pies.length ? (
        <div className={styles.pie__block}>
          <h3 className={styles['pie__block-title']}>Список ваших пирожков</h3>
          <ul className={styles['pie__block-list']}>
            {pies.map((pie, index) => {
              return <Pie data={pie} key={index} />;
            })}
          </ul>
        </div>
      ) : (
        <h2 className={styles['pie__not-found']}>У вас пока нет пирожков</h2>
      )}
    </section>
  );
});
