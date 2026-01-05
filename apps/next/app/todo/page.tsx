'use client'

import TodoScreen from 'app/features/todo/todo-screen'

function TodoPage() {
  return (
    <div
      style={{
        maxWidth: 600,
        width: '100%',
        display: 'flex',
        height: '100%',
        margin: 'auto',
        minHeight: '100vh',
      }}
    >
      <TodoScreen />
    </div>
  )
}

export default TodoPage
