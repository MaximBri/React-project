import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface pieInterface {
  description: string;
  imgLink: string;
  name: string;
  rarity: {
    chance: number;
    rare: string;
  };
}

const initialState: { pies: pieInterface[] | null } = {
  pies: null,
};

const PiesSlice = createSlice({
  name: 'pies',
  initialState,
  reducers: {
    setAllPies(state, action: PayloadAction<pieInterface[]>) {
      state.pies = action.payload;
    },
    addOnePie(state, action: PayloadAction<pieInterface>) {
      if (state.pies) state.pies.push(action.payload);
    },
  },
});
export const getPies = (state: RootState) => state.pies.pies;
export const { setAllPies, addOnePie } = PiesSlice.actions;
export default PiesSlice.reducer;
