import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

interface ActiveCardsInterface {
  activeCards: number[]
}

const initialState: ActiveCardsInterface = {
  activeCards: []
};

export function mergeTwoArrays(arrayOne: number[], arrayTwo: number[]) {
  let first, second = 0;
  console.log('before merge arrayCard=', arrayOne.join(' '));

  while (first < arrayOne.length || second < arrayTwo.length) {
    if (first < arrayOne.length && arrayOne[first] > arrayTwo[second]) {
      ++first;
      continue;
    }
    if (first < arrayOne.length && arrayOne[first] == arrayTwo[second]) {
      ++first;
      continue;
    }
    arrayOne.splice(first++, 0, arrayTwo[second++]);
  }
  console.log('after merge arrayCard=', arrayOne.join(' '));
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
    removeActiveCard: (state, action: PayloadAction<number>) => {
      const foundIndex = state.activeCards.findIndex(value => value == action.payload);
      if (foundIndex != -1) {
        state.activeCards.splice(foundIndex, 1);
      }
    },
    insertActiveCardsByArray: (state, action: PayloadAction<number[]>) => {
      if (state.activeCards.length == 0) {
        state.activeCards = (action.payload);
        return;
      }
      // we expect both arrays to be sorted otherwize it won't work
      mergeTwoArrays(state.activeCards, action.payload);
    },
    default: (state) => {
      return state;
    }
  }
});

export const { updateActiveCards, updateActiveCardsByArray, insertActiveCardsByArray, removeActiveCard } = activeCardsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectActiveCards = (state: RootState) => state.activeCards.activeCards

export default activeCardsSlice.reducer;