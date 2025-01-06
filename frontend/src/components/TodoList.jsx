import { useEffect, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import TodoItem from './TodoItem'
import { fetchTasks } from '../store/taskSlice'

const MotionDiv = motion(forwardRef((props, ref) => <div ref={ref} {...props} />))

function TodoList() {
  const dispatch = useDispatch()
  const { items: todos, status, error } = useSelector(state => state.tasks)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center py-8">
        <MotionDiv
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent"
        />
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-500 text-center py-4 bg-red-50 rounded-lg"
      >
        Error: {error}
      </MotionDiv>
    )
  }

  if (todos.length === 0) {
    return (
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg"
      >
        No tasks yet. Add one above!
      </MotionDiv>
    )
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout" initial={false}>
        {todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TodoList