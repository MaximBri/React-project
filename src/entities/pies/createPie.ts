import { apiRoutes } from '@/shared/globals/apiRoutes';
import { API_URL } from '@/shared/globals/globalsData';
import axios from 'axios';

export const createPieLogic = async (pieName: string, token: string) => {
  const response = await axios.get(
    `${API_URL}${apiRoutes.create_pie}?pieName=${pieName}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
