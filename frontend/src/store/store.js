import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './taskSlice'
import alertReducer from './alertSlice'

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    alert: alertReducer,
  },
}) 