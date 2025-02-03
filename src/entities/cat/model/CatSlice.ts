import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { catInterface } from '../../../shared/types';
import { RootState } from '@/app/store';

const initialState: catInterface = {
  existed: null,
  data: {
    name: null,
    role: null,
    phrase: null,
    description: null,
    color: null,
  },
};

const CatSlice = createSlice({
  name: 'cat',
  initialState,
  reducers: {
    setCatExisting(state, action: PayloadAction<boolean>) {
      state.existed = action.payload;
    },
    setCatName(state, action: PayloadAction<string>) {
      state.data.name = action.payload;
    },
    setCatData(state, action: PayloadAction<catInterface>) {
      state.existed = action.payload.existed;
      state.data = action.payload.data;
    },
  },
});
export const getExisting = (state: RootState) => state.cat.existed;
export const getName = (state: RootState) => state.cat.data.name;
export const getColor = (state: RootState) => state.cat.data.color;
export const getCatData = (state: RootState) => state.cat.data;
export const { setCatExisting, setCatName, setCatData } = CatSlice.actions;
export default CatSlice.reducer;
