import Cookies from 'js-cookie';
import axios from 'axios';

import { setAllFields } from '@/app/store/slices/AuthSlice';
import { API_URL, TOKEN } from '@/shared/globals/globalsData';
import { defaultUserData } from '../model/defaultUserData';
import { apiRoutes } from '@/shared/globals/apiRoutes';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { addNotification } from '@/widgets/pop-ups/notifications/model/addNotification';

export const deleteUserData = async (dispatch: Dispatch<UnknownAction>) => {
  const token = Cookies.get(TOKEN);
  dispatch(setAllFields(defaultUserData));
  if (token) {
    try {
      await axios.delete(
        `${API_URL}${apiRoutes.questionnaire}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      addNotification(dispatch, 'Анкета успешно удалена', 200)
    } catch (error: any) {
      console.error('Error fetching data:', error);
    }
  }
};
