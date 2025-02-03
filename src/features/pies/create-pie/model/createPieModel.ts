import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';

import { TOKEN } from '@/shared/globals/globalsData';
import { addNotification } from '@/widgets/pop-ups/notifications/model/addNotification';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { addOnePie } from '@/entities/pies/model/piesSlice';
import { routes } from '@/shared/config/routes';
import { checkUserAuthorization } from '@/entities/user/data-management/shared/checkUserAuthorization';
import { createPieLogic } from '@/entities/pies/createPie';

export const createPieModel = (dispatch: Dispatch<UnknownAction>) => {
  const token = Cookies.get(TOKEN);
  const [pieName, setPieName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const createPie = useCallback(async () => {
    if (!loading && token) {
      setLoading(true);
      try {
        const response: any = createPieLogic(pieName, token);
        const pieData = response.data.data;
        dispatch(
          addOnePie({
            description: pieData.effect.description,
            imgLink: pieData.imgLink,
            name: pieData.name,
            rarity: {
              chance: pieData.rarity.chance,
              rare: pieData.rarity.name,
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
  }, [pieName]);

  checkUserAuthorization(routes.main.home.path);

  return { createPie, pieName, setPieName };
};
