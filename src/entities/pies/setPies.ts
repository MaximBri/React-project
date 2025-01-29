import axios from 'axios';
import Cookies from 'js-cookie';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

import { API_URL, TOKEN } from '@/shared/globals/globalsData';
import { apiRoutes } from '@/shared/globals/apiRoutes';
import { setAllPies } from './model/piesSlice';

export const setPies = async (dispatch: Dispatch<UnknownAction>) => {
  const token = Cookies.get(TOKEN);
  if (token) {
    try {
      const response = await axios.get(`${API_URL}${apiRoutes.get_pie}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      let pies: any = [];
      response.data.data.forEach((item: any) => {
        pies.push({
          description: item.effect.description,
          imgLink: item.imgLink,
          name: item.name,
          rarity: {
            chance: item.rarity.chance,
            rare: item.rarity.name,
          },
        });
      });
      dispatch(setAllPies(pies));
    } catch (error: any) {
      if (error.status === 404) {
        dispatch(setAllPies([]));
      } else {
        console.error(error.status);
      }
    }
  }
};
