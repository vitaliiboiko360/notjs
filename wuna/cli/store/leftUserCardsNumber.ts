import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface LeftUserCardsNumber {
  leftUserCardsNumber: number
}

const initialState: LeftUserCardsNumber = {
  leftUserCardsNumber: 0
};

export const activeCardsSlice = createSlice({
  name: 'leftUserCardsNumber',
  initialState,
  reducers: {
    updateActiveCards: (state, action: PayloadAction<number>) => {
      state.leftUserCardsNumber = action.payload;
    },
    default: (state) => {
      return state;
    }
  }
});

export default activeCardsSlice.reducer;