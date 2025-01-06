import { motion } from 'framer-motion'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTodoEdit } from '../hooks/useTodoEdit'

function TodoEditForm({ todo, onSave, onCancel }) {
  const { editText, handleEditKeyDown, setEditText } = useTodoEdit(todo, onSave, onCancel)

  return (
    <div className="flex-1 flex items-center gap-2">
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={handleEditKeyDown}
        className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onSave(todo.id, editText)}
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