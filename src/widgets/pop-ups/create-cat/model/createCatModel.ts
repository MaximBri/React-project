import { NavigateFunction } from 'react-router-dom';
import { useState } from 'react';

import { createCatThunk } from '@/entities/cat/model/catThunks';
import { CatLogic } from '@/entities/cat/catLogic';
import { setCatWindow } from '@/app/store/slices/WindowsSlice';
import { addNotification } from '../../notifications/model/addNotification';
import { routes } from '@/shared/config/routes';
import { AppDispatch } from '@/app/store';

export const createCatModel = (
  dispatch: AppDispatch,
  navigate: NavigateFunction
) => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string>('');
  const toCreateCat = async () => {
    try {
      const result = await dispatch(createCatThunk(name));
      if (createCatThunk.fulfilled.match(result)) {
        const response = result.payload;
        CatLogic(response.data, dispatch);
        dispatch(setCatWindow(false));
        addNotification(dispatch, response.messageForUser, response.statusCode);
        navigate(routes.main.cat.path);
      }
    } catch (error) {
      setError('Произошла ошибка при создании кота');
    }
  };

  return { name, setName, error, setError, toCreateCat };
};
