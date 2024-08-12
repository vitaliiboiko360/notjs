import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

interface ActiveCardsInterface {
  activeCards: number[]
}

const initialState: ActiveCardsInterface = {
  activeCards: []
};

function mergeTwoArrays(arrayOne: number[], arrayTwo: Uint8Array) {
  let first, second = 0;

  while (first < arrayOne.length && second < arrayTwo.length) {
    if (arrayOne[first] < arrayTwo[second]) {
      ++first;
      continue;
    }
    if (arrayOne[first] == arrayTwo[second]) {
      ++first;
      continue;
    }
    arrayOne.splice(first++, 0, arrayTwo[second++]);
  }
}

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
    insertActiveCardsByArray: (state, action: PayloadAction<Uint8Array>) => {
      // we expect both arrays to be sorted otherwize it won't work
      mergeTwoArrays(state.activeCards, action.payload);
    },
    default: (state) => {
      return state;
    }
  }
});

export const { updateActiveCards, updateActiveCardsByArray, insertActiveCardsByArray } = activeCardsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectActiveCards = (state: RootState) => state.activeCards.activeCards

export default activeCardsSlice.reducer;