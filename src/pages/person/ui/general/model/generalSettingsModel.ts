import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { routes } from '@/app/routes/model/routes';
import { setCatData } from '@/app/store/slices/CatSlice';
import { convertData } from '@/entities/user/data-management/convertData';
import { deleteUserData } from '@/entities/user/data-management/deleteUserData';
import { defaultCatData } from '@/entities/cat/model/defaultCatData';
import { defaultUserData } from '@/entities/user/model/defaultUserData';
import { addNotification } from '@/widgets/pop-ups/notifications/model/addNotification';
import { CAT_TOKEN, TOKEN } from '@/shared/globals/globalsData';
import { putQuestionnaire } from '@/entities/user/data-management/questionnaire/putQuestionnaire';
import {
  getAllFields,
  getQuestionnaire,
  setAllFields,
  setAuth,
  setQuestionnaire,
} from '@/app/store/slices/AuthSlice';
import { postQuestionnaire } from '@/entities/user/data-management/questionnaire/postQuestionnaire';
import { setAllPies } from '@/entities/pies/model/piesSlice';

export interface generalSettingsErrorInterface {
  name?: string;
  birthday?: string;
}

export const generalSettingsModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(getAllFields);
  const questionnaire = useSelector(getQuestionnaire);
  const exitFromAcc = useCallback(() => {
    dispatch(setAuth(false));
    dispatch(setAllFields(defaultUserData));
    dispatch(setQuestionnaire(false));
    dispatch(setCatData(defaultCatData));
    dispatch(setAllPies([]))
    addNotification(dispatch, 'Вы вышли из аккаунта', 200);
    Cookies.set(TOKEN, '');
    Cookies.set(CAT_TOKEN, '');
    navigate(routes.main.home.path);
  }, []);
  const [name, setName] = useState<string>(userData.name || 'User');
  const [needSave, setNeedSave] = useState<boolean>(false);
  const [canSave, setCanSave] = useState<boolean>(false);
  const [error, setError] = useState<generalSettingsErrorInterface>({});
  const [birthday, setBirthday] = useState<string>(userData.birthday ?? '');

  const onChangeName = useCallback(
    (text: string) => {
      setName(text);
      if (text !== userData.name) setNeedSave(true);
      else setNeedSave(false);
    },
    [name, userData.name]
  );

  const deleteQuestionnaire = () => {
    deleteUserData(dispatch);
    dispatch(setQuestionnaire(false));
    setName('User');
    setBirthday('01.01.2000');
  };

  const onChangeBirthday = useCallback(
    (text: string) => {
      text = text.replace(/\D/g, '');
      if (text.length > 8) text = text.slice(0, 8);
      if (text.length > 2) {
        if (Number(text.slice(0, 2)) > 31) text = '';
        text = text.slice(0, 2) + '.' + text.slice(2);
      }
      if (text.length > 5) {
        if (Number(text.slice(3, 5)) > 12) text = text.slice(0, 3);
        text = text.slice(0, 5) + '.' + text.slice(5);
      }
      if (text.length === 10) {
        if (Number(text.slice(6, 10)) > Number(new Date().getFullYear()))
          text = text.slice(0, 6);
      }
      setBirthday(text);
      if (text !== convertData(userData.birthday ?? '01.01.2000'))
        setNeedSave(true);
      else setNeedSave(false);
    },
    [userData.birthday, name, userData.name]
  );

  const checkValidName = () => name.length !== 0;
  const checkValidBirthday = () => birthday.length === 10;

  const saveData = useCallback(() => {
    const data = { ...userData, name, birthday };
    const token = Cookies.get(TOKEN) ?? '';
    dispatch(setQuestionnaire(true));
    dispatch(setAllFields(data));
    questionnaire
      ? putQuestionnaire(data, token, dispatch)
      : postQuestionnaire(data, token, dispatch);
    setNeedSave(false);
    setCanSave(false);
  }, [name, birthday, userData]);

  useEffect(() => {
    if (!checkValidName()) {
      setError({ name: 'Имя не может быть пустым!' });
      setCanSave(false);
    } else if (!checkValidBirthday()) {
      setError({ birthday: 'Ваша дата рождения некорректна' });
      setCanSave(false);
    } else {
      setCanSave(true);
      setError({});
    }
  }, [name, birthday]);

  return {
    exitFromAcc,
    name,
    onChangeName,
    needSave,
    onChangeBirthday,
    birthday,
    canSave,
    error,
    saveData,
    deleteQuestionnaire,
    questionnaire
  };
};
