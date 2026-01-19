import { withTamagui } from '@tamagui/next-plugin'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    'solito',
    'react-native',
    'react-native-web',
    '@rn-primitives/slot',
    '@my/config',
    '@my/ui',
    '@my/core',
    '@my/features',
    '@my/api',
    'lucide-react-native',
    '@rn-primitives/dialog',
    '@rn-primitives/hooks',
    '@rn-primitives/portal',
    '@rn-primitives/separator',
    '@tamagui/react-native-svg',
    '@tamagui/next-theme',
    '@tamagui/lucide-icons',
    'expo-linking',
    'expo-modules-core',
    'nativewind',
    'react-native-css-interop',
  ],
  experimental: {
    scrollRestoration: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native': 'react-native-web',
      'react-native-svg': '@tamagui/react-native-svg',
    }
    return config
  },
  turbopack:{},
  reactCompiler: true,
  reactStrictMode: true,
}

const tamaguiPlugin = withTamagui({
  config: '../../packages/config/src/tamagui.config.ts',
  components: ['tamagui'],
})

export default tamaguiPlugin(nextConfig)
