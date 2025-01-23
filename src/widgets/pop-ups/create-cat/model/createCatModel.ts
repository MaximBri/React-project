import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

import { addNotification } from '../../notifications/model/addNotification';
import { API_URL, TOKEN } from '@/shared/globals/globalsData';
import { setCatWindow } from '@/app/store/slices/WindowsSlice';
import { apiRoutes } from '@/shared/globals/apiRoutes';
import { CatLogic } from '@/entities/cat/catLogic';
import { routes } from '@/app/routes/model/routes';

export const createCatModel = (dispatch: Dispatch<UnknownAction>) => {
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
  return { name, setName, error, setError, createCat };
};
