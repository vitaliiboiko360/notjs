import { configureStore } from '@reduxjs/toolkit'
import activeCardsReducer from './activeCards.ts'
import leftUserCardsNumberReducer from './leftUserCardsNumber.ts';
import topUserCardsNumberReducer from './topUserCardsNumber.ts';
import rightUserCardsNumberReducer from './rightUserCardsNumber.ts';
import bottomUserCardsNumberReducer from './bottomUserCardsNumber.ts';
import activeTableTopCardReducer from './activeTableTopCard.ts';

export const store = configureStore({
  reducer: {
    activeCards: activeCardsReducer,
    leftUserCardsNumber: leftUserCardsNumberReducer,
    topUserCardsNumber: topUserCardsNumberReducer,
    rightUserCardsNumber: rightUserCardsNumberReducer,
    bottomUserCardsNumber: bottomUserCardsNumberReducer,
    activeTableTopCard: activeTableTopCardReducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch