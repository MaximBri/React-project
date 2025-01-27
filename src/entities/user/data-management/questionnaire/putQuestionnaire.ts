import axios from 'axios';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

import { apiRoutes } from '@/shared/globals/apiRoutes';
import { API_URL } from '@/shared/globals/globalsData';
import { UserDataInterface } from '@/shared/types';
import { addNotification } from '@/widgets/pop-ups/notifications/model/addNotification';
import { convertDataToAPI } from '../convertData';

export const putQuestionnaire = async (
  data: UserDataInterface,
  token: string,
  dispatch: Dispatch<UnknownAction>
) => {
  console.log(data.birthday)
  console.log({
    ...data,
    birthday: convertDataToAPI(data.birthday ?? '01.01.2000'),
  });
  try {
    await axios.put(
      `${API_URL}${apiRoutes.questionnaire}`,
      {
        ...data,
        birthday: convertDataToAPI(data.birthday ?? '01.01.2000'),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    addNotification(dispatch, 'Данные сохранены успешно!', 200, 3000);
  } catch (error: any) {
    console.log(error);
    addNotification(dispatch, 'Ошибка при сохранении данных', 400, 3000);
  }
};
