import { createSlice, createAction, PayloadAction, createReducer } from '@reduxjs/toolkit'
import type { RootState } from './store.ts'

interface ActiveIndexState {
  value: number
}
const initialState: ActiveIndexState = {
  value: -1
};

const setActiveIndexActionCreator = createAction('SET_ACTIVE_INDEX');

export const setActiveIndexReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveIndexActionCreator.type, (state, action) => {
      console.log(`someone passed us action.payload=${action.payload}`);
      return { ...state, value: action.payload }
    })
    .addDefaultCase((state, action) => { console.log(`default case reducer`); return state; })
  // .addCase('default', (state, action) => {
  //   console.log(`default action`);
  //   return state;
  // })
})

export const activeIndexSlice = createSlice({
  name: 'activeIndex',
  initialState,
  reducers: {
    setActiveIndex: setActiveIndexReducer,
    testSetActiveIndex: (state, action) => {
      console.log(`testSetActiveIndex action.payload=${action.payload}`);
      return state;
    }
  },
})
// setActiveIndexAction: (state, action: PayloadAction<number>) => {
//   console.log(`someone passed us action.payload=${action.payload}`);
//   state.value = action.payload
//   return state.value;
// },

export function setActiveIndexAction2(value: number) {
  return {
    type: 'SET_ACTIVE_INDEX',
    payload: value,
  }
}

// Action creators are generated for each case reducer function
export const { setActiveIndex, testSetActiveIndex } = activeIndexSlice.actions

export const selectActiveIndex = (state: RootState) => {
  console.log('geting value Selector called')
  return state.activeIndex.value;
}

export default activeIndexSlice.reducer