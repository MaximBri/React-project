import axios from 'axios';
import Cookies from 'js-cookie';

import { API_URL, CAT_TOKEN, TOKEN } from '@/shared/globals/globalsData';
import { apiRoutes } from '@/shared/globals/apiRoutes';
import { routes } from '@/app/routes/model/routes';
import {
  setAllFields,
  setAuth,
  setLoading,
  setQuestionnaire,
} from '@/app/store/slices/AuthSlice';
import { setCatData } from '@/app/store/slices/CatSlice';

const setUserDataByToken = async (
  token: string | undefined,
  dispatch: any,
  navigate: any
) => {
  if (token) {
    dispatch(setAuth(true));
    dispatch(setLoading(true));
    try {
      const response = await axios.get(API_URL + apiRoutes.questionnaire, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setAllFields(response.data.data));
      dispatch(setQuestionnaire(true));
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 404) dispatch(setQuestionnaire(false));
      if (error.response.status === 401) {
        dispatch(setAuth(false));
        Cookies.set(TOKEN, '');
        navigate(routes.main.home.path);
      }
    }
    dispatch(setLoading(false));
  } else {
    dispatch(setLoading(false));
  }
  const catData = Cookies.get(CAT_TOKEN);
  if (catData) {
    dispatch(setCatData(JSON.parse(catData)));
  }
};

export default setUserDataByToken;
