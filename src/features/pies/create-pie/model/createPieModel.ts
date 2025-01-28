import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';

import { apiRoutes } from '@/shared/globals/apiRoutes';
import { API_URL, TOKEN } from '@/shared/globals/globalsData';
import { addNotification } from '@/widgets/pop-ups/notifications/model/addNotification';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { addOnePie } from '@/entities/pies/model/piesSlice';

export const createPieModel = (dispatch: Dispatch<UnknownAction>) => {
  const token = Cookies.get(TOKEN);
  const [pieName, setPieName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const createPie = async () => {
    if (!loading) {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}${apiRoutes.create_pie}?pieName=${pieName}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(
          addOnePie({
            description: response.data.effect.description,
            imgLink: response.data.imgLink,
            name: response.data.name,
            rarity: {
              chance: response.data.rarity.chance,
              rare: response.data.rarity.name,
            },
          })
        );
        addNotification(
          dispatch,
          response.data.messageForUser,
          response.data.statusCode
        );
        setPieName('');
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return { createPie, pieName, setPieName };
};
