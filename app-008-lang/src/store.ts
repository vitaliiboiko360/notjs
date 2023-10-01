import { configureStore } from '@reduxjs/toolkit'
import { setActiveIndex } from './activeIndexSlice.ts'
export const store = configureStore({
  reducer: { activeIndex: setActiveIndex }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch