import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

interface LeftUserCardsNumber {
  leftUserCardsNumber: number
}

const initialState: LeftUserCardsNumber = {
  leftUserCardsNumber: 0
};

export const leftUserCardsNumberSlice = createSlice({
  name: 'leftUserCardsNumber',
  initialState,
  reducers: {
    updateLeftUserCardsNumber: (state, action: PayloadAction<number>) => {
      state.leftUserCardsNumber = action.payload;
    },
    default: (state) => {
      return state;
    }
  }
});

export const { updateLeftUserCardsNumber } = leftUserCardsNumberSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLeftUserCardsNumber = (state: RootState) => state.leftUserCardsNumber

export default leftUserCardsNumberSlice.reducer;