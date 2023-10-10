import { createSlice, createAction, PayloadAction, createReducer } from '@reduxjs/toolkit'
import type { RootState } from './store.ts'

interface ActiveIndexState {
  value: number
}
const initialState: ActiveIndexState = {
  value: -1
};

const setActiveIndexActionCreator = createAction('SET_ACTIVE_INDEX');

export const setActiveIndexReducer = createReducer(-1, (builder) => {
  builder
    .addCase(setActiveIndexActionCreator.type, (state, action) => {
      state.value = action.payload
    })
})

export const activeIndexSlice = createSlice({
  name: 'activeIndex',
  initialState,
  reducers: {
    setActiveIndexAction: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  },
})

export function setActiveIndexAction2(value: number) {
  return {
    type: 'SET_ACTIVE_INDEX',
    payload: value,
  }
}

// Action creators are generated for each case reducer function
export const { setActiveIndexAction } = activeIndexSlice.actions

export const selectActiveIndex = (state: RootState) => state.activeIndex

export default activeIndexSlice.reducer