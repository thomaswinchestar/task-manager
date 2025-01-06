import { useState } from 'react'
import { useTodos } from './useTodos'

export function useTodoForm() {
  const [newTodo, setNewTodo] = useState('')
  const { addTodo } = useTodos()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    addTodo(newTodo)
    setNewTodo('')
  }

  return {
    newTodo,
    setNewTodo,
    handleSubmit
  }
} 