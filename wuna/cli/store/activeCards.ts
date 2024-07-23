import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

interface ActiveCardsInterface {
  activeCards: number[]
}

const initialState: ActiveCardsInterface = {
  activeCards: []
};

export const activeCardsSlice = createSlice({
  name: 'activeCards',
  initialState,
  reducers: {
    updateActiveCards: (state, action: PayloadAction<number>) => {
      state.activeCards.push(action.payload);
    },
    default: (state) => {
      return state;
    }
  }
});

export const { updateActiveCards } = activeCardsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectActiveCards = (state: RootState) => state.activeCards

export default activeCardsSlice.reducer;