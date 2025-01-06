import { motion } from 'framer-motion'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import TodoEditForm from './TodoEditForm'
import { useTodoContext } from '../context/TodoContext'

function TodoItem({ todo, onToggle, onStartEdit, editingId, onSave, onCancel }) {
  const { deleteTodo, showAlert } = useTodoContext()
  const isEditing = editingId === todo.id

  const handleDelete = (id) => {
    deleteTodo(id)
    showAlert('Task deleted successfully!', 'success')
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
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 rounded border-gray-300 focus:ring-blue-500"
      />
      
      {isEditing ? (
        <TodoEditForm
          todo={todo}
          onSave={onSave}
          onCancel={onCancel}
        />
      ) : (
        <>
          <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {todo.text}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onStartEdit(todo)}
            className="text-blue-500 hover:text-blue-600"
          >
            <PencilIcon className="h-5 w-5" />
          </motion.button>
        </>
      )}
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleDelete(todo.id)}
        className="text-red-500 hover:text-red-600"
      >
        <TrashIcon className="h-5 w-5" />
      </motion.button>
    </motion.div>
  )
}

export default TodoItem 