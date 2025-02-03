import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

const initialState: {
  register: boolean;
  auth: boolean;
  cat: boolean;
  inProcess: boolean;
} = {
  register: false,
  auth: false,
  cat: false,
  inProcess: false,
};

const WindowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    setRegisterWindow(state, action: PayloadAction<boolean>) {
      state.register = action.payload;
    },
    setAuthWindow(state, action: PayloadAction<boolean>) {
      state.auth = action.payload;
    },
    setCatWindow(state, action: PayloadAction<boolean>) {
      state.cat = action.payload;
    },
    setInProcess(state, action: PayloadAction<boolean>) {
      state.inProcess = action.payload;
    },
  },
});
export const getAuthWindow = (state: RootState) => state.windows.auth;
export const getRegisterWindow = (state: RootState) => state.windows.register;
export const getCatWindow = (state: RootState) => state.windows.cat;
export const getInProcess = (state: RootState) => state.windows.inProcess
export const {
  setAuthWindow,
  setRegisterWindow,
  setCatWindow,
  setInProcess,
} = WindowsSlice.actions;
export default WindowsSlice.reducer;
