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
    updateActiveCardsByArray: (state, action: PayloadAction<number[]>) => {
      state.activeCards.push.apply(state.activeCards, action.payload);
    },
    insertActiveCard: (state, action: { payload: { card: number, index: number } }) => {
      state.activeCards.splice(action.payload.index, 0, action.payload.card);
    },
    default: (state) => {
      return state;
    }
  }
});

export const { updateActiveCards, updateActiveCardsByArray } = activeCardsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectActiveCards = (state: RootState) => state.activeCards.activeCards

export default activeCardsSlice.reducer;