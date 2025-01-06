import { motion } from 'framer-motion'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask } from '../store/taskSlice'
import { useAlert } from '../context/TodoContext'
import Alert from './Alert'

function TodoForm() {
  const [newTodo, setNewTodo] = useState('')
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks.items)
  const { showAlert } = useAlert()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!newTodo.trim()) {
      showAlert('Please enter a task', 'error')
      return
    }

    const isDuplicate = tasks.some(
      task => task.text.toLowerCase() === newTodo.trim().toLowerCase()
    )

    if (isDuplicate) {
      showAlert('This task already exists', 'warning')
      return
    }

    try {
      await dispatch(addTask(newTodo.trim())).unwrap()
      setNewTodo('')
      showAlert('Task added successfully!', 'success')
    } catch (error) {
      showAlert('Failed to add task', 'error')
    }
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