import { configureStore } from '@reduxjs/toolkit'
import activeCardsReducer from './activeCards.ts'
import leftUserCardsNumber from './leftUserCardsNumber.ts';

export const store = configureStore({
  reducer: {
    activeCards: activeCardsReducer,
    leftUserCardsNumber: leftUserCardsNumber
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch