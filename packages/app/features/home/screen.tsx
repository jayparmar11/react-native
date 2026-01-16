'use client'
// FOR ICONS:
// import { Activity, Airplay } from '@tamagui/lucide-icons'

// FOR ANY TAMAGUI components
import { Button, H1, XStack, YStack, Text } from '@my/ui'

// FOR NAVIGATION :
import {} from 'solito/navigation'

export function HomeScreen() {
  return (
    <YStack flex={1} justify="center" items="center" gap="$8" p="$4" bg="$background">
      <YStack gap="$4">
        <H1 text="center" color="$color12">
          Welcome to Tamagui X react-native-reusable
        </H1>
      </YStack>
      <YStack p="$3" gap="$3">
        <Button>Plain</Button>
        <Button self="center" size="$6">
          Large
        </Button>
        <XStack gap="$2" justify="center">
          <Button size="$3" theme="accent">
            Active
          </Button>
          <Button size="$3" variant="outlined">
            Outlined
          </Button>
        </XStack>
        <XStack gap="$2">
          <Button themeInverse size="$3">
            Inverse
          </Button>
          <Button size="$3">iconAfter</Button>
        </XStack>
        <Button width="50%" size="$2" disabled opacity={0.5}>
          disabled
        </Button>

        <Button width="50%" size="$2" chromeless>
          chromeless
        </Button>
      </YStack>
    </YStack>
  )
}
