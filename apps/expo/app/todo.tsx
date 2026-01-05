import { View } from '@my/ui'
import TodoScreen from 'app/features/todo/todo-screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Todo',
          animation: 'slide_from_right',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <View style={{ paddingTop: 50, flex: 1 }} bg={'$background'}>
        <TodoScreen />
      </View>
    </>
  )
}
