import Cookies from 'js-cookie';

import { catInterface } from '../../shared/types';
import { defaultCatData } from './model/defaultCatData';
import { CAT_TOKEN } from '@/shared/globals/globalsData';
import { setCatData } from './model/CatSlice';

export const CatLogic = (catInfo: any, dispatch: any) => {
  if (catInfo) {
    const catData: catInterface = {
      existed: true,
      data: {
        name: catInfo.name,
        description: catInfo.personality.description,
        role: catInfo.personality.name,
        phrase: catInfo.phrase,
        color: catInfo.color.name,
      },
    };
    dispatch(setCatData(catData));
    Cookies.set(CAT_TOKEN, JSON.stringify(catData));
  } else {
    dispatch(setCatData(defaultCatData));
    Cookies.set(CAT_TOKEN, '');
  }
};
