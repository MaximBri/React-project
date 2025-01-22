import Cookies from 'js-cookie';

import { setAllFields, setQuestionnaire } from '@/app/store/slices/AuthSlice';
import { saveUserDataInterface, UserDataInterface } from '@/shared/types';
import { TOKEN } from '@/shared/globals/globalsData';
import { putQuestionnaire } from './questionnaire/putQuestionnaire';
import { postQuestionnaire } from './questionnaire/postQuestionnaire';

export const saveUserData = ({
  setCanChangeInput,
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
  setCanChangeInput(false);
  const data: UserDataInterface & { userId: number } = {
    userId: 0,
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
