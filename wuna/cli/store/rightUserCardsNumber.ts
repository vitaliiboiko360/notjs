import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

interface RightUserCardsNumberInterface {
  rightUserCardsNumber: number
}

const initialState: RightUserCardsNumberInterface = {
  rightUserCardsNumber: 0
};

export const rightUserCardsNumberSlice = createSlice({
  name: 'rightUserCardsNumber',
  initialState,
  reducers: {
    updateRightUserCardsNumber: (state, action: PayloadAction<number>) => {
      state.rightUserCardsNumber = action.payload;
    },
    incrementRightUserCardsNumber: (state, action: PayloadAction<void>) => {
      state.rightUserCardsNumber++;
    },
    default: (state) => {
      return state;
    }
  }
});

export const { updateRightUserCardsNumber, incrementRightUserCardsNumber } = rightUserCardsNumberSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectRightUserCardsNumber = (state: RootState) => state.rightUserCardsNumber.rightUserCardsNumber

export default rightUserCardsNumberSlice.reducer;