import { useState } from 'react'

export function useTodoEdit(todo, onSave, onCancel) {
  const [editText, setEditText] = useState(todo.text)

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSave(todo.id, editText)
    } else if (e.key === 'Escape') {
      onCancel()
    }
  }

  return {
    editText,
    setEditText,
    handleEditKeyDown
  }
} 