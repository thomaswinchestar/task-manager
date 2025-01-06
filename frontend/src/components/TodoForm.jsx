import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { addTask } from '../store/taskSlice'
import { useAlert } from '../context/TodoContext'

function TodoForm() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const todos = useSelector(state => state.tasks.items)
  const { showAlert } = useAlert()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!text.trim()) {
      showAlert('Please enter a task before adding', 'error')
      return
    }

    const isDuplicate = todos.some(
      todo => todo.text.toLowerCase() === text.trim().toLowerCase()
    )

    if (isDuplicate) {
      showAlert('This task already exists', 'warning')
      return
    }

    try {
      await dispatch(addTask(text.trim())).unwrap()
      setText('')
      showAlert('Task added successfully!', 'success')
    } catch (error) {
      showAlert('Failed to add task', 'error')
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add
        </motion.button>
      </div>
    </motion.form>
  )
}

export default TodoForm 