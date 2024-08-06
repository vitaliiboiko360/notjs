import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

interface ActiveMoveInterface {
  card: number,
  lastPlayer: number
}

const initialState: ActiveMoveInterface = {
  card: 0,
  lastPlayer: 0
};

export const activeMoveSlice = createSlice({
  name: 'activeMove',
  initialState,
  reducers: {
    updateActiveMove: {
      reducer: (state, action: { payload: { card: number, lastPlayer: number } }) => {
        state.card = action.payload.card;
        state.lastPlayer = action.payload.lastPlayer;
      },
      prepare: (card: number, lastPlayer: number) => {
        return {
          payload: {
            card: card,
            lastPlayer: lastPlayer
          }
        }
      }
    },
    updateActiveMoveCard: (state, action: PayloadAction<number>) => {
      state.card = action.payload;
    },
    updateActiveMoveLastPlayer: (state, action: PayloadAction<number>) => {
      state.card = action.payload;
    },
    default: (state) => {
      return state;
    }
  }
});

export const { updateActiveMove, updateActiveMoveCard, updateActiveMoveLastPlayer } = activeMoveSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectActiveMoveCard = (state: RootState) => state.activeMove.card;
export const selectActiveMoveLastPlayer = (state: RootState) => state.activeMove.lastPlayer;

export default activeMoveSlice.reducer;