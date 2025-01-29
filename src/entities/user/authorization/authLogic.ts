import axios from 'axios';
import Cookie from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { catInterface } from '@/shared/types';
import { setCatData } from '@/app/store/slices/CatSlice';
import { setAuth, setExpires } from '@/app/store/slices/AuthSlice';
import { setAuthWindow } from '@/app/store/slices/WindowsSlice';
import { messages } from './model/messagesForUser';
import { defaultCatData } from '@/entities/cat/model/defaultCatData';
import { API_URL, CAT_TOKEN, TOKEN } from '@/shared/globals/globalsData';
import { routes } from '@/app/routes/model/routes';
import { apiRoutes } from '@/shared/globals/apiRoutes';
import { addNotification } from '@/widgets/pop-ups/notifications/model/addNotification';

interface AuthLogicReturnType {
  entance: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

interface AuthLogicEntanceType {
  login: string;
  pass: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthMess: React.Dispatch<React.SetStateAction<string>>;
  setStateAuthErr: React.Dispatch<React.SetStateAction<string>>;
}

const useAuthLogic = ({
  login,
  pass,
  setLoading,
  setAuthMess,
  setStateAuthErr,
}: AuthLogicEntanceType): AuthLogicReturnType => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const time: Date = useSelector<any, Date>((state) => state.auth.expiresIn);
  const entance = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const body = {
      login,
      password: pass,
    };
    if (pass && login) {
      try {
        setLoading(true);
        setStateAuthErr('');
        const response = await axios.post(API_URL + apiRoutes.login, body, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const catInfo = response.data.data.cat;
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
          Cookie.set(CAT_TOKEN, JSON.stringify(catData));
        } else {
          dispatch(setCatData(defaultCatData));
          Cookie.set(CAT_TOKEN, '');
        }
        addNotification(
          dispatch,
          response.data.messageForUser,
          response.data.statusCode
        );
        setAuthMess(messages[0]);
        dispatch(setAuth(true));
        dispatch(setExpires(time));
        dispatch(setAuthWindow(false));
        Cookie.set(TOKEN, response.data.data.token.token);
        navigate(routes.main.home.path);
      } catch (error: any) {
        console.log(error);
        if (error.status === 404) setStateAuthErr(messages[4]);
        else setStateAuthErr(messages[2]);
      }
    } else {
      setStateAuthErr(messages[8]);
    }
    setLoading(false);
  };
  return { entance };
};

export default useAuthLogic;
