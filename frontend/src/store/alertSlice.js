import { createSlice } from '@reduxjs/toolkit'

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    alerts: []
  },
  reducers: {
    showAlert: {
      reducer: (state, action) => {
        state.alerts.push(action.payload)
      },
      prepare: (payload) => {
        return {
          payload: {
            id: Date.now(),
            message: payload.message,
            type: payload.type || 'success'
          }
        }
      }
    },
    hideAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload)
    }
  }
})

export const { showAlert, hideAlert } = alertSlice.actions
export default alertSlice.reducer 