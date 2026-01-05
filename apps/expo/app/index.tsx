import { HomeScreen } from 'app/features/home/screen'
import { Stack } from 'expo-router'
import { ScrollView, StatusBar, Text } from 'react-native'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <HomeScreen />
    </>
  )
}
