import axios from 'axios';
import Cookies from 'js-cookie';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

import { setCatData, setCatExisting } from '@/entities/cat/model/CatSlice';
import { API_URL, CAT_TOKEN, TOKEN } from '@/shared/globals/globalsData';
import { convertData } from './convertData';
import { apiRoutes } from '@/shared/globals/apiRoutes';
import { setPies } from '@/entities/pies/setPies';
import { routes } from '@/shared/config/routes';
import {
  setAllFields,
  setAuth,
  setLoading,
  setQuestionnaire,
} from '../authorization/model/AuthSlice';

const setUserDataByToken = async (
  token: string | undefined,
  dispatch: Dispatch<UnknownAction>,
  navigate: any
) => {
  if (token) {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(API_URL + apiRoutes.get_questionnaire, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setAuth(true));
      dispatch(
        setAllFields({
          ...response.data.data,
          birthday: convertData(response.data.data.birthday),
          name: response.data.data.name || 'User',
        })
      );
      dispatch(setQuestionnaire(true));
    } catch (error: any) {
      if (error.response?.status === 404) {
        dispatch(setQuestionnaire(false));
        dispatch(setAuth(true));
      } else if (error.response.status === 401) {
        dispatch(setAuth(false));
        Cookies.set(TOKEN, '');
        navigate(routes.main.home.path);
      } else console.error(error);
    }
    setPies(dispatch);
    dispatch(setLoading(false));
  } else {
    dispatch(setLoading(false));
  }
  const catData = Cookies.get(CAT_TOKEN);
  if (catData) {
    dispatch(setCatData(JSON.parse(catData)));
  } else {
    dispatch(setCatExisting(false));
  }
};

export default setUserDataByToken;
