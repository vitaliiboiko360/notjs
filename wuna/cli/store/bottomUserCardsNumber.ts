import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

interface BottomUserCardsNumberInterface {
  bottomUserCardsNumber: number
}

const initialState: BottomUserCardsNumberInterface = {
  bottomUserCardsNumber: 0
};

export const bottomUserCardsNumberSlice = createSlice({
  name: 'bottomUserCardsNumber',
  initialState,
  reducers: {
    updateBottomUserCardsNumber: (state, action: PayloadAction<number>) => {
      state.bottomUserCardsNumber = action.payload;
    },
    default: (state) => {
      return state;
    }
  }
});

export const { updateBottomUserCardsNumber } = bottomUserCardsNumberSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectBottomUserCardsNumber = (state: RootState) => state.bottomUserCardsNumber

export default bottomUserCardsNumberSlice.reducer;