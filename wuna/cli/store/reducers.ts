import { createReducer, createAction } from '@reduxjs/toolkit'

const updateActiveCards = createAction('UPDATE_CARDS', (value: number) => {
  return {
    payload: value
  }
});

interface AppState {
  activeCards: number[],
  leftUserCardsNumber: number,
  topUserCardsNumber: number,
  rightUserCardsNumber: number
}

const initialState: AppState = {
  activeCards: [],
  leftUserCardsNumber: 0,
  topUserCardsNumber: 0,
  rightUserCardsNumber: 0
};

const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateActiveCards, (state, action) => {
      state.activeCards = [...state.activeCards, action.payload];
    })
    .addDefaultCase((state, action) => {
      //state.activeCards.push(action.payload);
    })
});

export default rootReducer;