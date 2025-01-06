import { motion } from 'framer-motion'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import Alert from './components/Alert'
import { TodoProvider } from './context/TodoContext'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTasks } from './store/taskSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-100 py-8 px-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center text-gray-800 mb-8"
          >
            Task Manager
          </motion.h1>
          <TodoForm />
          <TodoList />
        </div>
      </div>
      <Alert />
    </TodoProvider>
  )
}

export default App
