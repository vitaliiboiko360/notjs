import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

interface ActiveTableTopCardInterface {
  activeTableTopCard: number
}

const initialState: ActiveTableTopCardInterface = {
  activeTableTopCard: 0
};

export const activeTableTopCardSlice = createSlice({
  name: 'activeTableTopCard',
  initialState,
  reducers: {
    updateActiveTableTopCard: (state, action: PayloadAction<number>) => {
      state.activeTableTopCard = action.payload;
    },
    default: (state) => {
      return state;
    }
  }
});

export const { updateActiveTableTopCard } = activeTableTopCardSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectActiveTableTopCard = (state: RootState) => state.activeTableTopCard.activeTableTopCard

export default activeTableTopCardSlice.reducer;