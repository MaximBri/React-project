import Cookies from 'js-cookie';

import { setAllFields, setQuestionnaire } from '@/app/store/slices/AuthSlice';
import { saveUserDataInterface, UserDataInterface } from '@/shared/types';
import { putQuestionnaire } from './questionnaire/putQuestionnaire';
import { postQuestionnaire } from './questionnaire/postQuestionnaire';
import { TOKEN } from '@/shared/globals/globalsData';

export const saveUserData = ({
  questionnaire,
  name,
  birthday,
  hobby,
  season,
  flower,
  dish,
  chillTime,
  film,
  singer,
  color,
  positiveTraits,
  dream,
  dispatch,
}: saveUserDataInterface) => {
  const data: UserDataInterface = {
    name,
    birthday,
    hobby,
    season,
    flower,
    dish,
    chillTime,
    film,
    singer,
    color,
    positiveTraits,
    dream,
  };
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
