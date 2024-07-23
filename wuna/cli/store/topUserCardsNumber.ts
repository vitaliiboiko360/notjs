import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

interface TopUserCardsNumberInterface {
  topUserCardsNumber: number
}

const initialState: TopUserCardsNumberInterface = {
  topUserCardsNumber: 0
};

export const topUserCardsNumberSlice = createSlice({
  name: 'topUserCardsNumber',
  initialState,
  reducers: {
    updateTopUserCardsNumber: (state, action: PayloadAction<number>) => {
      state.topUserCardsNumber = action.payload;
    },
    default: (state) => {
      return state;
    }
  }
});

export const { updateTopUserCardsNumber } = topUserCardsNumberSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTopUserCardsNumber = (state: RootState) => state.topUserCardsNumber.topUserCardsNumber

export default topUserCardsNumberSlice.reducer;