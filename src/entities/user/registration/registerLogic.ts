import axios from 'axios';
import Cookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { setRegisterWindow } from '@/app/store/slices/WindowsSlice';
import { API_URL, TOKEN } from '@/shared/globals/globalsData';
import { apiRoutes } from '@/shared/globals/apiRoutes';
import { routes } from '@/shared/config/routes';
import { setAuth } from '../authorization/model/AuthSlice';
import { messages } from '../authorization/model/messagesForUser';
import { addNotification } from '@/widgets/pop-ups/notifications/model/addNotification';
import {
  RegisterLogicEntanceType,
  RegisterLogicReturnType,
} from '@/shared/types';

const useRegisterLogic = ({
  login,
  pass,
  setLoading,
  setRegMess,
  setStateRegErr,
}: RegisterLogicEntanceType): RegisterLogicReturnType => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [repeatPass, setRepeatPass] = useState<string>('');
  const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (pass.length < 4) {
      setStateRegErr({ pass: messages[5] });
    } else if (!login) {
      setStateRegErr({ login: messages[9] });
    } else if (!name) {
      setStateRegErr({ name: messages[7] });
    } else if (pass !== repeatPass) {
      setStateRegErr({ pass: messages[6] });
    } else {
      const body = {
        name,
        login,
        password: pass,
      };
      try {
        setStateRegErr({});
        setLoading(true);
        const response = await axios.post(
          API_URL + apiRoutes.registration,
          body,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        dispatch(setAuth(true));
        Cookie.set(TOKEN, response.data.data.token.token);
        setRegMess(messages[0]);
        dispatch(setRegisterWindow(false));
        addNotification(
          dispatch,
          response.data.messageForUser,
          response.data.statusCode
        );
        navigate(routes.main.home.path);
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 409)
          setStateRegErr({ other: messages[3] });
        else setStateRegErr({ other: messages[4] });
      }
      setLoading(false);
    }
  };
  return {
    register,
    name,
    setName,
    repeatPass,
    setRepeatPass,
  };
};

export default useRegisterLogic;
