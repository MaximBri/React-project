import { routes } from '@/app/routes/model/routes';
import {
  setAllFields,
  setAuth,
  setQuestionnaire,
} from '@/app/store/slices/AuthSlice';
import { setCatData } from '@/app/store/slices/CatSlice';
import {
  clearMessage,
  pushMessage,
} from '@/app/store/slices/NotificationSlice';
import { defaultCatData } from '@/entities/cat/model/defaultCatData';
import { defaultUserData } from '@/entities/user/model/defaultUserData';
import { CAT_TOKEN, TOKEN } from '@/shared/globals/globalsData';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const generalSettingsModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exitFromAcc = () => {
    dispatch(setAuth(false));
    dispatch(setAllFields(defaultUserData));
    dispatch(setQuestionnaire(false));
    dispatch(setCatData(defaultCatData));
    dispatch(
      pushMessage({
        message: 'Вы вышли из аккаунта',
        statusCode: 200,
      })
    );
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
    Cookies.set(TOKEN, '');
    Cookies.set(CAT_TOKEN, '');
    navigate(routes.main.home.path);
  };
  return { exitFromAcc };
};
