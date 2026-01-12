import { Text as TamaText, View as TamaView } from 'tamagui'
// import { Text, View } from 'react-native'
import { Text as UiText, View as UiView } from '@exp/ui'
import { HomeScreen } from '@exp/app/src/features/home/screen'
import { Stack } from 'expo-router'

import { Text as RNText, View as RNView } from 'react-native'

import { Text, View } from '@exp/ui'

export default function Screen() {
  return (
    <>
      <HomeScreen />
    </>
  )
}
