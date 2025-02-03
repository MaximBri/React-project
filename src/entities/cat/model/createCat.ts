import axios from 'axios';
import Cookies from 'js-cookie';
import { NavigateFunction } from 'react-router-dom';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

import { API_URL, TOKEN } from '@/shared/globals/globalsData';
import { setCatWindow } from '@/app/store/slices/WindowsSlice';
import { apiRoutes } from '@/shared/globals/apiRoutes';
import { CatLogic } from '@/entities/cat/catLogic';
import { routes } from '@/shared/config/routes';
import { addNotification } from '@/widgets/pop-ups/notifications/model/addNotification';

export const createCat = async (
  name: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
  dispatch: Dispatch<UnknownAction>,
  navigate: NavigateFunction
) => {
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
