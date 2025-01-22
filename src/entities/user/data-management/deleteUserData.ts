import Cookies from 'js-cookie';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { setAllFields } from '@/app/store/slices/AuthSlice';
import { TOKEN } from '@/shared/globals/globalsData';

export const deleteUserData = async (birthday: Date | string) => {
  const dispatch = useDispatch();
  const token = Cookies.get(TOKEN);
  dispatch(
    setAllFields({
      name: '',
      birthday,
      hobby: '',
      season: '',
      flower: '',
      dish: '',
      chillTime: '',
      film: '',
      singer: '',
      color: '',
      positiveTraits: '',
      dream: '',
    })
  );
  if (token) {
    try {
      const response = await axios.delete(
        'https://catsandpies.ru/api/Questionnaire',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error: any) {
      console.error('Error fetching data:', error);
    }
  }
};
