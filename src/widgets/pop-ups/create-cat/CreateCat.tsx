import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCatWindow } from '../../../app/store/slices/WindowsSlice';
import { setMessage } from '@/features/notifications/model/messagesLogic';
import { CatLogic } from '../../../entities/cat/catLogic';
import attentionSvg from '/img/attention.svg';
import styles from './CreateCat.module.scss';

export const CreateCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState<string>('');
  const createCat = async () => {
    try {
      const response = await axios.post(
        'https://catsandpies.ru/api/Cat/CreateCat',
        name,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );
      const catInfo = response.data.data;
      CatLogic(catInfo, dispatch);
      dispatch(setCatWindow(false));
      setMessage({
        message: response.data.messageForUser,
        statusCode: response.data.statusCode,
        dispatch,
      });
      navigate('/Cat');
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
