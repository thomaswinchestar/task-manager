import { createContext, useContext } from 'react'
import { useTodos } from '../hooks/useTodos'

const TodoContext = createContext(null)

export function TodoProvider({ children }) {
  const todoState = useTodos()
  
  return (
    <TodoContext.Provider value={todoState}>
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