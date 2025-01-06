import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import Alert from './components/Alert'
import { TodoProvider } from './context/TodoContext'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTasks } from './store/taskSlice'

const MotionH1 = motion(forwardRef((props, ref) => <h1 ref={ref} {...props} />))

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <MotionH1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center text-gray-800 mb-8"
          >
            Task Manager
          </MotionH1>
          <TodoForm />
          <TodoList />
        </div>
        <Alert />
      </div>
    </TodoProvider>
  )
}

export default App
