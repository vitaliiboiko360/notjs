import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  activeCards: number[]
}

const initialState: AppState = {
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

export default activeCardsSlice.reducer;