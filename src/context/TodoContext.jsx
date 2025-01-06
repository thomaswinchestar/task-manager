import { createContext, useContext, useState } from 'react'
import { useTodos } from '../hooks/useTodos'

const TodoContext = createContext(null)

export function TodoProvider({ children }) {
  const todoState = useTodos()
  const [alert, setAlert] = useState({ message: '', type: 'error' })

  const showAlert = (message, type = 'error') => {
    setAlert({ message, type })
    // Auto-hide alert after 5 seconds
    setTimeout(() => {
      setAlert({ message: '', type: 'error' })
    }, 5000)
  }

  const hideAlert = () => {
    setAlert({ message: '', type: 'error' })
  }
  
  return (
    <TodoContext.Provider value={{ ...todoState, alert, showAlert, hideAlert }}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodoContext() {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider')
  }
  return context
} 