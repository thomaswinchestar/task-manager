import { createContext, useContext, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { showAlert as showReduxAlert, hideAlert } from '../store/alertSlice'

const TodoContext = createContext()

export function TodoProvider({ children }) {
  const dispatch = useDispatch()

  const showAlert = useCallback((message, type = 'success') => {
    const action = dispatch(showReduxAlert({ message, type }))
    const alertId = action.payload.id
    setTimeout(() => {
      dispatch(hideAlert(alertId))
    }, 5000) // 5 seconds
  }, [dispatch])

  return (
    <TodoContext.Provider value={{ showAlert }}>
      {children}
    </TodoContext.Provider>
  )
}

export function useAlert() {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useAlert must be used within a TodoProvider')
  }
  return context
} 