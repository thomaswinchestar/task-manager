import { motion, AnimatePresence } from 'framer-motion'
import TodoItem from './TodoItem'
import { useTodoContext } from '../context/TodoContext'

function TodoList() {
  const { todos, toggleTodo, deleteTodo, startEditing, editingId, saveEdit, cancelEditing } = useTodoContext()

  return (
    <AnimatePresence>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onStartEdit={startEditing}
          editingId={editingId}
          onSave={saveEdit}
          onCancel={cancelEditing}
        />
      ))}
    </AnimatePresence>
  )
}

export default TodoList 