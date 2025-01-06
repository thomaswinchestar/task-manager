import { createContext, useContext, useState } from 'react'

const TodoContext = createContext(null)

export function TodoProvider({ children }) {
  const [alerts, setAlerts] = useState([])

  const showAlert = (message, type = 'error') => {
    const id = Date.now()
    setAlerts(prev => [...prev, { id, message, type }])
    
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id))
    }, 5000)
  }

  const hideAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }
  
  return (
    <TodoContext.Provider value={{ alerts, showAlert, hideAlert }}>
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