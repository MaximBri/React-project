import Cookies from 'js-cookie';
import axios from 'axios';

import { API_URL, TOKEN } from '@/shared/globals/globalsData';
import { defaultUserData } from '../model/defaultUserData';
import { apiRoutes } from '@/shared/globals/apiRoutes';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { addNotification } from '@/widgets/pop-ups/notifications/model/addNotification';
import { setAllFields } from '../authorization/model/AuthSlice';

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
