import { motion } from 'framer-motion'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTodoEdit } from '../hooks/useTodoEdit'
import { useTodoContext } from '../context/TodoContext'

function TodoEditForm({ todo, onSave, onCancel }) {
  const { showAlert, todos } = useTodoContext()
  const { editText, handleEditKeyDown, setEditText } = useTodoEdit(todo, onSave, onCancel)

  const handleSave = () => {
    if (!editText.trim()) {
      showAlert('Task cannot be empty', 'error')
      return
    }

    const isDuplicate = todos.some(
      t => t.id !== todo.id && 
      t.text.toLowerCase() === editText.trim().toLowerCase()
    )

    if (isDuplicate) {
      showAlert('This task already exists', 'warning')
      return
    }

    onSave(todo.id, editText)
    showAlert('Task updated successfully!', 'success')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      onCancel()
    }
  }

  return (
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
        onClick={onCancel}
        title="Cancel (Esc)"
        className="text-gray-500 hover:text-gray-600"
      >
        <XMarkIcon className="h-5 w-5" />
      </motion.button>
    </div>
  )
}

export default TodoEditForm 