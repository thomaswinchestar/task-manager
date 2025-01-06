import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import TodoItem from './TodoItem'
import { fetchTasks } from '../store/taskSlice'

function TodoList() {
  const dispatch = useDispatch()
  const { items: todos, status, error } = useSelector(state => state.tasks)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  if (status === 'loading') {
    return <div className="text-center py-4">Loading tasks...</div>
  }

  if (status === 'failed') {
    return <div className="text-red-500 text-center py-4">Error: {error}</div>
  }

  if (todos.length === 0) {
    return <div className="text-gray-500 text-center py-4">No tasks yet. Add one above!</div>
  }

  return (
    <AnimatePresence>
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
        />
      ))}
    </AnimatePresence>
  )
}

export default TodoList 