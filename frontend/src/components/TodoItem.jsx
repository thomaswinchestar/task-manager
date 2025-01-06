import { useState, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { updateTask, deleteTask } from '../store/taskSlice'
import { useAlert } from '../context/TodoContext'

const MotionDiv = motion(forwardRef((props, ref) => <div ref={ref} {...props} />))
const MotionButton = motion(forwardRef((props, ref) => <button ref={ref} {...props} />))

const TodoItem = forwardRef(({ todo }, ref) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(todo.text)
  const dispatch = useDispatch()
  const todos = useSelector(state => state.tasks.items)
  const { showAlert } = useAlert()

  const handleUpdate = async () => {
    if (!editedText.trim()) {
      showAlert('Task cannot be empty', 'error')
      return
    }

    const isDuplicate = todos.some(
      t => t._id !== todo._id && 
      t.text.toLowerCase() === editedText.trim().toLowerCase()
    )

    if (isDuplicate) {
      showAlert('This task already exists', 'warning')
      return
    }

    try {
      await dispatch(updateTask({
        id: todo._id,
        updates: { text: editedText.trim() }
      })).unwrap()
      setIsEditing(false)
      showAlert('Task updated successfully!', 'success')
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

  const handleToggleComplete = async () => {
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

  return (
    <MotionDiv
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white rounded-lg shadow-md p-4 mb-4 transition-colors duration-200 ${
        todo.completed ? 'bg-gray-50' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <MotionButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleComplete}
            className={`mr-3 transition-colors duration-200 ${
              todo.completed ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'
            }`}
            title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            <CheckCircleIcon className="h-6 w-6" />
          </MotionButton>
          
          {isEditing ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleUpdate()
                if (e.key === 'Escape') {
                  setIsEditing(false)
                  setEditedText(todo.text)
                }
              }}
              className="flex-1 mr-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          ) : (
            <div
              onClick={handleToggleComplete}
              className={`flex-1 cursor-pointer transition-all duration-200 select-none ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-800 hover:text-gray-600'
              }`}
            >
              {todo.text}
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="p-1.5 hover:bg-green-100 rounded transition-colors"
                title="Save (Enter)"
              >
                <CheckIcon className="h-5 w-5 text-green-600" />
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setEditedText(todo.text)
                }}
                className="p-1.5 hover:bg-red-100 rounded transition-colors"
                title="Cancel (Esc)"
              >
                <XMarkIcon className="h-5 w-5 text-red-600" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 hover:bg-blue-100 rounded transition-colors"
                title="Edit"
              >
                <PencilIcon className="h-5 w-5 text-blue-600" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1.5 hover:bg-red-100 rounded transition-colors"
                title="Delete"
              >
                <TrashIcon className="h-5 w-5 text-red-600" />
              </button>
            </>
          )}
        </div>
      </div>
    </MotionDiv>
  )
})

TodoItem.displayName = 'TodoItem'

export default TodoItem