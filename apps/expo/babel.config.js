module.exports = (api) => {
  api.cache(true)
  return {
    presets: [
      'nativewind/babel',
      ['babel-preset-expo', { jsxRuntime: 'automatic', jsxImportSource: 'nativewind' }],
    ],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['../..'],
          alias: {
            '@exp/app': '../../packages/app/src',
            '@exp/ui': '../../packages/ui/src',
          },
          extensions: ['.js', '.jsx', '.tsx', '.ios.js', '.android.js'],
        },
      ],
      // if you want reanimated support
      // 'react-native-reanimated/plugin',
      ...(process.env.EAS_BUILD_PLATFORM === 'android'
        ? []
        : [
            [
              '@tamagui/babel-plugin',
              {
                components: ['@exp/ui/src', 'tamagui'],
                config: '../../packages/config/src/tamagui.config.ts',
                logTimings: true,
                disableExtraction: process.env.NODE_ENV === 'development',
              },
            ],
          ]),
    ],
  }
}
