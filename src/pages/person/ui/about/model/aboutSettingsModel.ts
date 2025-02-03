import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

import { questionnaireKeyType, UserDataInterface } from '@/shared/types';
import { deleteUserData } from '@/entities/user/data-management/deleteUserData';
import { saveUserData } from '@/entities/user/data-management/saveUserData';
import {
  getAllFields,
  getQuestionnaire,
  setQuestionnaire,
} from '@/entities/user/authorization/model/AuthSlice';

export const aboutSettingsModel = ({
  dispatch,
}: {
  dispatch: Dispatch<UnknownAction>;
}) => {
  const userData = useSelector(getAllFields);
  let questionnaire = useSelector(getQuestionnaire);
  const [needSave, setNeedSave] = useState<boolean>(false);
  const [data, setData] = useState<UserDataInterface>(userData);

  const onDataChange = (key: questionnaireKeyType, value: string) => {
    setData((prevData) => {
      const newData = { ...prevData, [key]: value };
      if (JSON.stringify(newData) !== JSON.stringify(userData)) {
        setNeedSave(true);
      } else {
        setNeedSave(false);
      }
      return newData;
    });
  };

  const saveUserDataProvider = () => {
    saveUserData(questionnaire ?? false, data, dispatch);
    setNeedSave(false);
  };

  const clearUserData = async () => {
    deleteUserData(dispatch);
    dispatch(setQuestionnaire(false));
    setData({});
  };

  return {
    saveUserDataProvider,
    clearUserData,
    onDataChange,
    needSave,
    other: {
      ...data,
    },
  };
};
