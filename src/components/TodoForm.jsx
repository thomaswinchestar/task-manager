import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTodoContext } from '../context/TodoContext'
import Alert from './Alert'

function TodoForm() {
  const [newTodo, setNewTodo] = useState('')
  const { addTodo, todos, alert, showAlert, hideAlert } = useTodoContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Check for empty submission
    if (!newTodo.trim()) {
      showAlert('Please enter a task before adding', 'error')
      return
    }

    // Check for duplicate todo
    const isDuplicate = todos.some(
      todo => todo.text.toLowerCase() === newTodo.trim().toLowerCase()
    )

    if (isDuplicate) {
      showAlert('This task already exists', 'warning')
      return
    }

    addTodo(newTodo)
    setNewTodo('')
    showAlert('Task added successfully!', 'success')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </motion.button>
        </div>
      </form>
      <Alert 
        message={alert.message}
        type={alert.type}
        onClose={hideAlert}
      />
    </>
  )
}

export default TodoForm 