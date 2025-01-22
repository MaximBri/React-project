import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCatWindow } from '../../../app/store/slices/WindowsSlice';
import { CatLogic } from '../../../entities/cat/catLogic';
import attentionSvg from '/img/attention.svg';
import styles from './CreateCat.module.scss';
import { addNotification } from '../notifications/model/addNotification';
import { routes } from '@/app/routes/model/routes';
import { API_URL, TOKEN } from '@/shared/globals/globalsData';
import { apiRoutes } from '@/shared/globals/apiRoutes';

export const CreateCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState<string>('');
  const createCat = async () => {
    try {
      const response = await axios.post(
        `${API_URL}${apiRoutes.cat_create}`,
        name,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get(TOKEN)}`,
          },
        }
      );
      const catInfo = response.data.data;
      CatLogic(catInfo, dispatch);
      dispatch(setCatWindow(false));
      addNotification(
        dispatch,
        response.data.messageForUser,
        response.data.statusCode
      );

      navigate(routes.main.cat.path);
    } catch (error) {
      console.log(error);
      setError('Произошла ошибка при создании кота');
    }
  };
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
