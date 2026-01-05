'use client'

import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { Checkbox, ScrollView, Sheet, Input, Button, H1, Text, View, YStack } from 'tamagui'
import { Trash2, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useTodoStore } from './useTodoStore' // adjust path

function TodoScreen() {
  const todos = useTodoStore((s) => s.todos)
  const inputValue = useTodoStore((s) => s.inputValue)
  const setInputValue = useTodoStore((s) => s.setInputValue)
  const addTodo = useTodoStore((s) => s.addTodo)
  const toggleTodo = useTodoStore((s) => s.toggleTodo)
  const removeTodo = useTodoStore((s) => s.removeTodo)

  const list = Array.from(todos.values())

  // local state for update sheet
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetPosition, setSheetPosition] = useState(0)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')

  const startEdit = (id: string) => {
    const todo = todos.get(id)
    if (!todo) return
    setEditingId(id)
    setEditingTitle(todo.title)
    setSheetOpen(true)
  }

  const saveEdit = () => {
    Keyboard.dismiss()
    console.log('hii')
    if (!editingId) return
    const todo = todos.get(editingId)
    if (!todo) {
      setSheetOpen(false)
      return
    }

    const title = editingTitle.trim()
    if (!title) {
      setSheetOpen(false)
      return
    }

    // small inline update: reuse existing store Map pattern
    useTodoStore.setState((state) => {
      const next = new Map(state.todos)
      const current = next.get(editingId)
      if (!current) return state
      next.set(editingId, { ...current, title })
      return { todos: next }
    })

    setSheetOpen(false)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <YStack flex={1} justify="flex-start" items="center" p="$4" gap="$4" bg="$background">
        <H1>Todo</H1>

        <ScrollView
          rounded="$6"
          borderWidth="$0.5"
          borderColor="$white3"
          width="100%"
          flex={1}
          keyboardShouldPersistTaps="handled"
        >
          <YStack
            width="100%"
            p="$4"
            justify="flex-start"
            items="flex-start"
            gap="$2"
            bg="$background"
          >
            {list.length === 0 && <Text color="$white7">No todos yet. Add your first task.</Text>}

            {list.map((todo) => (
              <View
                key={todo.id}
                bg={todo.completed ? '$green3' : '$blue2'}
                rounded="$4"
                padding="$2"
                width="100%"
                minHeight="$5"
              >
                <YStack flexDirection="row" justify="space-between" items="center" gap="$2.5">
                  <Checkbox
                    size="$5"
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />

                  <Button
                    chromeless
                    flex={1}
                    justifyContent="flex-start"
                    onPress={() => startEdit(todo.id)}
                  >
                    <Text flex={1} textDecorationLine={todo.completed ? 'line-through' : 'none'}>
                      {todo.title}
                    </Text>
                  </Button>

                  <Button
                    width="$4"
                    height="$4"
                    chromeless
                    onPress={() => removeTodo(todo.id)}
                    color="$red10"
                    p={0}
                    icon={<Trash2 />}
                  />
                </YStack>
              </View>
            ))}
          </YStack>
        </ScrollView>

        <YStack width="100%" justify="flex-start" items="flex-start" gap="$4" bg="$background">
          <Input
            width="100%"
            value={inputValue}
            onChangeText={(value) => {
              if (typeof value === 'string') {
                setInputValue(value)
              }
            }}
            onChange={(e: any) => {
              if (e?.target?.value != null) {
                setInputValue(String(e.target.value))
              }
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addTodo()
              }
            }}
            placeholder="Add a task..."
          />
          <Button width="100%" onPress={addTodo}>
            Add
          </Button>
        </YStack>
      </YStack>

      {/* Update Todo Sheet */}
      <Sheet
        modal
        animation="quick"
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        snapPoints={[30, 50, 80]}
        position={sheetPosition}
        onPositionChange={setSheetPosition}
        moveOnKeyboardChange={true}
      >
        <Sheet.Overlay
          bg="$shadow4"
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle bg="$color8" />
        <Sheet.Frame items="center" justify="center" gap="$4" bg="$color2" p="$4">
          <Sheet.ScrollView width="100%" keyboardShouldPersistTaps="handled">
            <YStack width="100%" gap="$3">
              <H1 size="$5">Update todo</H1>

              <Input
                width="100%"
                value={editingTitle}
                onChangeText={(value) => {
                  if (typeof value === 'string') {
                    setEditingTitle(value)
                  }
                }}
                onChange={(e: any) => {
                  if (e?.target?.value != null) {
                    setEditingTitle(String(e.target.value))
                  }
                }}
                placeholder="Edit your task..."
              />

              <YStack gap="$2">
                <Button width="100%" onPress={saveEdit}>
                  Save
                </Button>

                <Button width="100%" chromeless onPress={() => setSheetOpen(false)}>
                  Cancel
                </Button>
              </YStack>
            </YStack>
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </KeyboardAvoidingView>
  )
}

export default TodoScreen
