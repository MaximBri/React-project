import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { coins: number | null } = {
  coins: 0,
};

const CoinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setCoins(state, action: PayloadAction<number>) {
      state.coins = action.payload;
    },
  },
});
export const getCoins = (state: RootState) => state.coins.coins;
export const { setCoins } = CoinsSlice.actions;
export default CoinsSlice.reducer;
