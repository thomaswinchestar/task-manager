import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrashIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

function App() {
  const [todos, setTodos] = useState(() => {
    // Initialize todos from localStorage
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    
    setTodos([...todos, {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false
    }])
    setNewTodo('')
  }

  const startEditing = (todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditText('')
  }

  const saveEdit = (id) => {
    if (!editText.trim()) return
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editText.trim() } : todo
    ))
    setEditingId(null)
    setEditText('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleEditKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      saveEdit(id)
    } else if (e.key === 'Escape') {
      cancelEditing()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center text-gray-800 mb-8"
        >
          Todo List
        </motion.h1>

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

        <AnimatePresence>
          {todos.map(todo => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center gap-4"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-5 w-5 rounded border-gray-300 focus:ring-blue-500"
              />
              
              {editingId === todo.id ? (
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => handleEditKeyDown(e, todo.id)}
                    className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => saveEdit(todo.id)}
                    title="Save (Enter)"
                    className="text-green-500 hover:text-green-600"
                  >
                    <CheckIcon className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={cancelEditing}
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
                    onClick={() => startEditing(todo)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </motion.button>
                </>
              )}
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-600"
              >
                <TrashIcon className="h-5 w-5" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
