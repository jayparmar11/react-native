module.exports = (api) => {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic', jsxImportSource: 'nativewind' }]],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['../..'],
          alias: {
            '@my/api': '../../packages/api',
            '@my/core': '../../packages/core/src',
            '@my/features': '../../packages/features/src',
            '@my/ui': '../../packages/ui',
            '@my/config': '../../packages/config',
          },
          extensions: ['.js', '.jsx', '.tsx', '.ios.js', '.android.js'],
        },
      ],
      ...(process.env.EAS_BUILD_PLATFORM === 'android'
        ? []
        : [
            [
              '@tamagui/babel-plugin',
              {
                components: ['@my/ui', 'tamagui'],
                config: '../../packages/config/src/index.ts', // Unified path
                logTimings: true,
                disableExtraction: process.env.NODE_ENV === 'development',
              },
            ],
          ]),
      'react-native-reanimated/plugin', // Recommended since you use RNR
    ],
  }
}
