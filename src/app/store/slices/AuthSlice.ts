import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { UserDataInterface } from '../../../shared/types';

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
  data: {
    name: '',
    email: '',
    birthday: '01.01.2000',
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
  },
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.auth = action.payload;
      // console.log(action.payload)
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
      // console.log(action.payload)
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
} = AuthSlice.actions;
export default AuthSlice.reducer;
