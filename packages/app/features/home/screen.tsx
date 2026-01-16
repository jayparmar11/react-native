'use client'

// FOR ICONS:
// import { Activity, Airplay } from '@tamagui/lucide-icons'

// FOR ANY TAMAGUI components
import { Button, H1, XStack, YStack, Text } from '@my/ui'

// FOR NAVIGATION :
import { useLink } from 'solito/navigation'

export function HomeScreen() {
  const studentsLink = useLink({
    href: '/students',
  })

  return (
    <YStack className="items-center justify-center flex-1 gap-8 px-4">
      <YStack className="items-center gap-2">
        <H1 textAlign="center">Welcome to Tamagui X react-native-reusable</H1>
        <Text textAlign="center">
          Student management demo using Tamagui, NativeWind, and React Query.
        </Text>
      </YStack>

      <XStack className="flex-row flex-wrap justify-center gap-4">
        {/* Existing sample buttons / variants can stay here if you want */}
        <Button size="$4" theme="accent" {...studentsLink}>
          Students
        </Button>
      </XStack>
    </YStack>
  )
}
