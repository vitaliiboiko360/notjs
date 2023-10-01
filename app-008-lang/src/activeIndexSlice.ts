import { createSlice } from '@reduxjs/toolkit'

export const activeIndexSlice = createSlice({
  name: 'activeIndex',
  initialState: {
    value: -1,
  },
  reducers: {
    setActiveIndex: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setActiveIndex } = activeIndexSlice.actions

export default activeIndexSlice.reducer