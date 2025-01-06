import { motion } from 'framer-motion'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TrashIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { updateTask, deleteTask } from '../store/taskSlice'
import { useAlert } from '../context/TodoContext'

function TodoItem({ todo }) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const tasks = useSelector(state => state.tasks.items)
  const { showAlert } = useAlert()

  const handleToggle = async () => {
    try {
      await dispatch(updateTask({
        id: todo._id,
        updates: { completed: !todo.completed }
      })).unwrap()
      showAlert(`Task marked as ${!todo.completed ? 'completed' : 'incomplete'}`, 'success')
    } catch (error) {
      showAlert('Failed to update task', 'error')
    }
  }

  const handleDelete = async () => {
    try {
      await dispatch(deleteTask(todo._id)).unwrap()
      showAlert('Task deleted successfully!', 'success')
    } catch (error) {
      showAlert('Failed to delete task', 'error')
    }
  }

  const handleSave = async () => {
    if (!editText.trim()) {
      showAlert('Task cannot be empty', 'error')
      return
    }

    const isDuplicate = tasks.some(
      t => t._id !== todo._id && 
      t.text.toLowerCase() === editText.trim().toLowerCase()
    )

    if (isDuplicate) {
      showAlert('This task already exists', 'warning')
      return
    }

    try {
      await dispatch(updateTask({
        id: todo._id,
        updates: { text: editText.trim() }
      })).unwrap()
      setIsEditing(false)
      showAlert('Task updated successfully!', 'success')
    } catch (error) {
      showAlert('Failed to update task', 'error')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditText(todo.text)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center gap-4"
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="h-5 w-5 rounded border-gray-300 focus:ring-blue-500"
      />
      
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            title="Save (Enter)"
            className="text-green-500 hover:text-green-600"
          >
            <CheckIcon className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsEditing(false)
              setEditText(todo.text)
            }}
            title="Cancel (Esc)"
            className="text-gray-500 hover:text-gray-600"
          >
            <XMarkIcon className="h-5 w-5" />
          </motion.button>
        </div>
      ) : (
        <>
          <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {todo.text}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-600"
          >
            <PencilIcon className="h-5 w-5" />
          </motion.button>
        </>
      )}
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleDelete}
        className="text-red-500 hover:text-red-600"
      >
        <TrashIcon className="h-5 w-5" />
      </motion.button>
    </motion.div>
  )
}

export default TodoItem 