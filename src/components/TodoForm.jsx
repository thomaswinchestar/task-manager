import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTodoContext } from '../context/TodoContext'

function TodoForm() {
  const [newTodo, setNewTodo] = useState('')
  const { addTodo } = useTodoContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    addTodo(newTodo)
    setNewTodo('')
  }

  return (
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
  )
}

export default TodoForm 