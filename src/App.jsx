import { motion } from 'framer-motion'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import { TodoProvider } from './context/TodoContext'

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-100 py-8 px-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center text-gray-800 mb-8"
          >
            Todo List
          </motion.h1>
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
