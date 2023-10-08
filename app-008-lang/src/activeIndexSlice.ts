import { createSlice, PayloadAction, createReducer } from '@reduxjs/toolkit'
import type { RootState } from './store.ts'

interface ActiveIndexState {
  value: number
}
const initialState: ActiveIndexState = {
  value: -1
};

export const setActiveIndexReducer = createReducer(-1, (builder) => {
  builder
    .addCase('SET_ACTIVE_INDEX', (state, action) => {
      state.value = action.payload
    })
})

export const activeIndexSlice = createSlice({
  name: 'activeIndex',
  initialState,
  reducers: {
    setActiveIndex: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  },
})

export function setActiveIndexAction(value: number) {
  return {
    type: 'SET_ACTIVE_INDEX',
    payload: value,
  }
}

// Action creators are generated for each case reducer function
export const { setActiveIndex } = activeIndexSlice.actions

export const selectActiveIndex = (state: RootState) => state.activeIndex.value

export default activeIndexSlice.reducer