import { Button, H1, Input, Text, View, YStack } from '@my/ui'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { Checkbox, ScrollView } from 'tamagui'
import { Check, Trash2 } from '@tamagui/lucide-icons'
import { useTodoStore } from './useTodoStore'

function TodoScreen() {
  const todos = useTodoStore((state) => state.todos)
  const inputValue = useTodoStore((state) => state.inputValue)
  const setInputValue = useTodoStore((state) => state.setInputValue)
  const addTodo = useTodoStore((state) => state.addTodo)
  const toggleTodo = useTodoStore((state) => state.toggleTodo)
  const removeTodo = useTodoStore((state) => state.removeTodo)

  const list = Array.from(todos.values())

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <YStack flex={1} justify="flex-start" items="center" p="$4" gap="$4" bg="$background">
        <H1>Todo</H1>

        <ScrollView rounded="$6" borderWidth="$0.5" borderColor="$white3" width="100%" flex={1}>
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
                <YStack
                  flexDirection="row"
                  justify="space-between"
                  items="center"
                  gap="$2.5"
                  paddingLeft={'$2'}
                >
                  <Checkbox
                    size="$5"
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  >
                    <Checkbox.Indicator>
                      <Check />
                    </Checkbox.Indicator>
                  </Checkbox>

                  <Text flex={1} textDecorationLine={todo.completed ? 'line-through' : 'none'}>
                    {todo.title}
                  </Text>

                  <Button
                    width="$4"
                    height="$4"
                    chromeless
                    onPress={() => removeTodo(todo.id)}
                    color="$red10"
                    icon={<Trash2 size="$1" />}
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
              setInputValue(String(value))
            }}
            placeholder="Add a task..."
          />
          <Button width="100%" onPress={addTodo}>
            Add
          </Button>
        </YStack>
      </YStack>
    </KeyboardAvoidingView>
  )
}

export default TodoScreen
