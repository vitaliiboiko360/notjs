import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import { isReverseCard } from '../svg/svg_getcard.tsx';

interface ActiveMoveInterface {
  card: number,
  lastPlayer: number,
  directionClockwize: boolean,
  wildCardColor: number
}

const initialState: ActiveMoveInterface = {
  card: 0,
  lastPlayer: 0,
  directionClockwize: true,
  wildCardColor: 0
};

export const activeMoveSlice = createSlice({
  name: 'activeMove',
  initialState,
  reducers: {
    updateActiveMove: {
      reducer: (state, action: { payload: { card: number, lastPlayer: number } }) => {
        if (isReverseCard(action.payload.card)) {
          state.directionClockwize = !state.directionClockwize;
        }
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
    updateActiveMoveWildCardColor: (state, action: PayloadAction<number>) => {
      state.wildCardColor = action.payload;
    },
    default: (state) => {
      return state;
    }
  }
});

export const { updateActiveMove, updateActiveMoveCard, updateActiveMoveLastPlayer, updateActiveMoveWildCardColor } = activeMoveSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectActiveMoveCard = (state: RootState) => state.activeMove.card;
export const selectActiveMoveLastPlayer = (state: RootState) => state.activeMove.lastPlayer;
export const selectActiveMoveDirection = (state: RootState) => state.activeMove.directionClockwize;
export const selectActiveMoveWildCardColor = (state: RootState) => state.activeMove.wildCardColor;

export default activeMoveSlice.reducer;