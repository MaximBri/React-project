import axios from 'axios';
import Cookies from 'js-cookie';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

import { API_URL, CAT_TOKEN, TOKEN } from '@/shared/globals/globalsData';
import { setCatData, setCatExisting } from '@/app/store/slices/CatSlice';
import { convertData } from './convertData';
import { apiRoutes } from '@/shared/globals/apiRoutes';
import { setPies } from '@/entities/coins/setPies';
import { routes } from '@/app/routes/model/routes';
import {
  setAllFields,
  setAuth,
  setLoading,
  setQuestionnaire,
} from '@/app/store/slices/AuthSlice';

const setUserDataByToken = async (
  token: string | undefined,
  dispatch: Dispatch<UnknownAction>,
  navigate: any
) => {
  if (token) {
    dispatch(setAuth(true));
    dispatch(setLoading(true));
    try {
      const response = await axios.get(API_URL + apiRoutes.get_questionnaire, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(
        setAllFields({
          ...response.data.data,
          birthday: convertData(response.data.data.birthday),
          name: response.data.data.name || 'User',
        })
      );
      dispatch(setQuestionnaire(true));
      setPies(dispatch);
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
  } else {
    dispatch(setCatExisting(false));
  }
};

export default setUserDataByToken;
