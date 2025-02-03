import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { defaultUserData } from '@/entities/user/model/defaultUserData';
import { UserDataInterface } from '@/shared/types';
import { RootState } from '@/app/store';

const initialState: {
  expiresIn: Date | null;
  auth: boolean;
  questionnaire: boolean | null;
  loading: boolean;
  data: UserDataInterface;
} = {
  expiresIn: null,
  auth: false,
  questionnaire: null,
  loading: true,
  data: defaultUserData,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.auth = action.payload;
    },
    setExpires(state, action: PayloadAction<Date>) {
      state.expiresIn = action.payload;
    },
    setQuestionnaire(state, action: PayloadAction<boolean | null>) {
      state.questionnaire = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAllFields(state, action: PayloadAction<UserDataInterface>) {
      state.data = action.payload;
      if (action.payload.name) state.auth = true;
    },
    updateUserData(state, action: any) {
      state.data = { ...state.data, ...action };
    },
  },
});
export const getAuth = (state: RootState) => state.auth.auth;
export const getLoading = (state: RootState) => state.auth.loading;
export const getAllFields = (state: RootState) => state.auth.data;
export const getQuestionnaire = (state: RootState) => state.auth.questionnaire;
export const {
  setAuth,
  setAllFields,
  setExpires,
  setLoading,
  setQuestionnaire,
  updateUserData,
} = AuthSlice.actions;
export default AuthSlice.reducer;
