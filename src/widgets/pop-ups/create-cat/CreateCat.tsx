import { useDispatch } from 'react-redux';

import { setCatWindow } from '@/app/store/slices/WindowsSlice';
import { createCatModel } from './model/createCatModel';
import attentionSvg from '/img/attention.svg';
import styles from './CreateCat.module.scss';

export const CreateCat = () => {
  const dispatch = useDispatch();
  const { error, name, setName, createCat } = createCatModel(dispatch);
  return (
    <>
      <div className={styles.cat}>
        <h2 className={styles.cat__title}>Создай своего кота</h2>
        <div className={styles.cat__attention}>
          <img src={attentionSvg} alt="Attention" />
          <h3>Кота можно создать только 1 раз</h3>
          {error && <h3>{error}</h3>}
        </div>
        <h3 className={styles.cat__name}>Придумай имя для кота</h3>
        <input
          className={styles['cat__name-input']}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя кота"
        />
        {name && (
          <button
            className={styles['cat__create-btn']}
            onClick={() => createCat()}
          >
            Создать кота
          </button>
        )}
      </div>
      <div
        className={styles.cat__background}
        onClick={() => dispatch(setCatWindow(false))}
      ></div>
    </>
  );
};
