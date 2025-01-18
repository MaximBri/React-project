import Cookies from 'js-cookie';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { routes } from '@/app/routes/model/routes';
import { getAuth } from '@/app/store/slices/AuthSlice';
import { getCatData } from '@/app/store/slices/CatSlice';
import { apiRoutes } from '@/shared/globals/apiRoutes';
import { API_URL, TOKEN } from '@/shared/globals/globalsData';

export const catPageModel = () => {
  const navigate = useNavigate();
  const catData = useSelector(getCatData);
  const auth = useSelector(getAuth);
  const [description, setDescription] = useState<boolean>(false);
  const [phrase, setPhrase] = useState<string | null>(catData.phrase);
  if (!auth || !catData.name) navigate(routes.main.home.path);
  const getNewPhrase = () => {
    setPhrase('Думает...');
    setTimeout(async () => {
      const token = Cookies.get(TOKEN);
      if (token) {
        try {
          const responce = await axios.get(API_URL + apiRoutes.cat_speech, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          setPhrase(responce.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    }, 1000);
  };
  return { description, setDescription, phrase, getNewPhrase, catData };
};
