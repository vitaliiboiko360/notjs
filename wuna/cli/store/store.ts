import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers.ts'

const store = configureStore({
  reducer: rootReducer,
})

export default store