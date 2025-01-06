import { useState, useEffect } from 'react'

export function useTodos() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    setTodos([...todos, {
      id: Date.now(),
      text: text.trim(),
      completed: false
    }])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const startEditing = (todo) => {
    setEditingId(todo.id)
  }

  const saveEdit = (id, newText) => {
    if (!newText.trim()) return
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    ))
    setEditingId(null)
  }

  const cancelEditing = () => {
    setEditingId(null)
  }

  return {
    todos,
    editingId,
    addTodo,
    toggleTodo,
    deleteTodo,
    startEditing,
    saveEdit,
    cancelEditing
  }
} 