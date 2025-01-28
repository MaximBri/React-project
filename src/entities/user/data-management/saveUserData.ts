import Cookies from 'js-cookie';

import { setAllFields, setQuestionnaire } from '@/app/store/slices/AuthSlice';
import { UserDataInterface } from '@/shared/types';
import { putQuestionnaire } from './questionnaire/putQuestionnaire';
import { postQuestionnaire } from './questionnaire/postQuestionnaire';
import { TOKEN } from '@/shared/globals/globalsData';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

export const saveUserData = (
  questionnaire: boolean,
  data: UserDataInterface,
  dispatch: Dispatch<UnknownAction>
) => {
  dispatch(setAllFields(data));
  dispatch(setQuestionnaire(true));
  const fetchData = () => {
    const token = Cookies.get(TOKEN);
    if (token) {
      if (questionnaire) {
        putQuestionnaire(data, token, dispatch);
      } else {
        postQuestionnaire(data, token, dispatch);
      }
    }
  };
  fetchData();
};
