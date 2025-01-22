import axios from 'axios';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

import { apiRoutes } from '@/shared/globals/apiRoutes';
import { API_URL } from '@/shared/globals/globalsData';
import { UserDataInterface } from '@/shared/types';
import { addNotification } from '@/widgets/pop-ups/notifications/model/addNotification';

export const postQuestionnaire = async (
  data: UserDataInterface & { userId: number },
  token: string,
  dispatch: Dispatch<UnknownAction>
) => {
  try {
    await axios.post(
      `${API_URL}${apiRoutes.questionnaire}`,
      { ...data },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    addNotification(dispatch, 'Данные сохранены успешно!', 200, 3000);
  } catch (error) {
    console.log(error);
    addNotification(dispatch, 'Ошибка при сохранении данных', 400, 3000);
  }
};
