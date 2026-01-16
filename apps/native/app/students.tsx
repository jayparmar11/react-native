import { Stack } from 'expo-router'
import { StudentListScreen } from 'app/features/students/list'

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <StudentListScreen />
    </>
  )
}
