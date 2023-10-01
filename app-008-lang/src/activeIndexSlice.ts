import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface ActiveIndexState {
  value: number
}
const initialState = {
  value: 0
} as ActiveIndexState;

export const activeIndexSlice = createSlice({
  name: 'activeIndex',
  initialState,
  reducers: {
    setActiveIndex: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setActiveIndex } = activeIndexSlice.actions

export const selectActiveIndex = (state: RootState) => state.activeIndex.value

export default activeIndexSlice.reducer