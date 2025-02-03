import { apiRoutes } from '@/shared/globals/apiRoutes';
import { API_URL } from '@/shared/globals/globalsData';
import { messageWithCatInterface } from '@/shared/types';
import axios from 'axios';

export const getNewPhraseFromCat = async (
  pushMessage: (message: messageWithCatInterface) => void,
  setLoading: (value: React.SetStateAction<boolean | undefined>) => void,
  token: string
) => {
  try {
    const responce = await axios.get(API_URL + apiRoutes.cat_speech, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    pushMessage({ content: responce.data.data, author: 'bot' });
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
