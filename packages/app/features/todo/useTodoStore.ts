import { create } from 'zustand'

export type Todo = {
  id: string
  title: string
  completed: boolean
}

type TodoState = {
  todos: Map<string, Todo>
  inputValue: string
}

type TodoActions = {
  setInputValue: (value: string) => void
  addTodo: () => void
  toggleTodo: (id: string) => void
  removeTodo: (id: string) => void
}

type TodoStore = TodoState & TodoActions

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: new Map(),
  inputValue: '',

  setInputValue: (value) => set({ inputValue: value }),

  addTodo: () => {
    const title = get().inputValue.trim()
    if (!title) return

    const id = Date.now().toString()
    const nextTodo: Todo = { id, title, completed: false }

    set((state) => {
      const next = new Map(state.todos)
      next.set(id, nextTodo)
      return { todos: next, inputValue: '' }
    })
  },

  toggleTodo: (id) =>
    set((state) => {
      const next = new Map(state.todos)
      const current = next.get(id)
      if (!current) return state
      next.set(id, { ...current, completed: !current.completed })
      return { todos: next }
    }),

  removeTodo: (id) =>
    set((state) => {
      const next = new Map(state.todos)
      next.delete(id)
      return { todos: next }
    }),
}))
