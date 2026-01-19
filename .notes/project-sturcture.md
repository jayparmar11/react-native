# Project Structure

```
demo-tamagui-rnr/
├── apps
│   ├── native
│   │   ├── app
│   │   │   ├── rnr
│   │   │   │   └── students
│   │   │   │       ├── update
│   │   │   │       ├── add.tsx
│   │   │   │       └── index.tsx
│   │   │   ├── students
│   │   │   │   ├── update
│   │   │   │   │   └── [id].tsx
│   │   │   │   ├── add.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── _layout.tsx
│   │   │   └── index.tsx
│   │   ├── assets
│   │   │   └── images
│   │   │       ├── android-icon-background.png
│   │   │       ├── android-icon-foreground.png
│   │   │       ├── android-icon-monochrome.png
│   │   │       ├── favicon.png
│   │   │       ├── icon.png
│   │   │       ├── partial-react-logo.png
│   │   │       ├── react-logo.png
│   │   │       ├── react-logo@2x.png
│   │   │       ├── react-logo@3x.png
│   │   │       └── splash-icon.png
│   │   ├── scripts
│   │   │   └── fix-xcode-env.mjs
│   │   ├── app.json
│   │   ├── babel.config.js
│   │   ├── eas.json
│   │   ├── expo-env.d.ts
│   │   ├── global.css
│   │   ├── index.js
│   │   ├── metro.config.js
│   │   ├── nativewind-env.d.ts
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── types.d.ts
│   └── web
│       ├── public
│       │   ├── favicon.ico
│       │   ├── file.svg
│       │   ├── globe.svg
│       │   ├── next.svg
│       │   ├── tamagui.css
│       │   ├── vercel.svg
│       │   └── window.svg
│       ├── src
│       │   ├── pages
│       │   │   ├── api
│       │   │   │   └── hello.ts
│       │   │   ├── rnr
│       │   │   │   └── students
│       │   │   ├── students
│       │   │   │   ├── update
│       │   │   │   ├── add.tsx
│       │   │   │   └── index.tsx
│       │   │   ├── _app.tsx
│       │   │   ├── _document.tsx
│       │   │   └── index.tsx
│       │   └── global.css
│       ├── -babel.config.js
│       ├── nativewind-env.d.ts
│       ├── next-env.d.ts
│       ├── next.config.ts
│       ├── package.json
│       ├── postcss.config.js
│       ├── README.md
│       ├── tailwind.config.js
│       ├── tsconfig.json
│       └── types.d.ts
├── packages
│   ├── api
│   │   ├── axios-client.ts
│   │   ├── index.ts
│   │   ├── orval.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── config
│   │   ├── src
│   │   │   ├── animations.ts
│   │   │   ├── fonts.ts
│   │   │   ├── index.ts
│   │   │   └── tamagui.config.ts
│   │   └── package.json
│   ├── core
│   │   ├── src
│   │   │   ├── constants
│   │   │   ├── hooks
│   │   │   ├── providers
│   │   │   │   ├── safe-area
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── index.web.tsx
│   │   │   │   │   ├── use-safe-area.ts
│   │   │   │   │   └── use-safe-area.web.ts
│   │   │   │   ├── index.tsx
│   │   │   │   ├── NextTamaguiProvider.tsx
│   │   │   │   ├── query-client-provider.tsx
│   │   │   │   ├── ToastViewport.tsx
│   │   │   │   └── ToastViewport.web.tsx
│   │   │   ├── store
│   │   │   └── utils
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── features
│   │   ├── src
│   │   │   ├── (react-native-reusables)
│   │   │   │   └── students
│   │   │   │       ├── add.tsx
│   │   │   │       ├── list.tsx
│   │   │   │       └── update.tsx
│   │   │   ├── (tamagui)
│   │   │   │   └── students
│   │   │   │       ├── add.tsx
│   │   │   │       ├── list.tsx
│   │   │   │       └── update.tsx
│   │   │   └── home
│   │   │       └── screen.tsx
│   │   ├── index.ts
│   │   ├── nativewind-env.d.ts
│   │   ├── package.json
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── types.d.ts
│   └── ui
│       ├── src
│       │   ├── components
│       │   │   ├── button.tsx
│       │   │   ├── dialog.tsx
│       │   │   ├── icon.tsx
│       │   │   ├── index.tsx
│       │   │   ├── input.tsx
│       │   │   ├── native-only-animated-view.native.tsx
│       │   │   ├── native-only-animated-view.tsx
│       │   │   ├── separator.tsx
│       │   │   └── text.tsx
│       │   ├── lib
│       │   │   ├── theme.ts
│       │   │   └── utils.ts
│       │   ├── CustomToast.tsx
│       │   ├── index.tsx
│       │   ├── MyComponent.tsx
│       │   ├── NativeToast.tsx
│       │   ├── rnr.tsx
│       │   ├── SwitchRouterButton.tsx
│       │   ├── SwitchThemeButton.tsx
│       │   └── types.d.ts
│       ├── components.json
│       ├── nativewind-env.d.ts
│       ├── package.json
│       ├── tailwind.config.js
│       └── tsconfig.json
├── imporve-project.md
├── package.json
├── prompt-rnr.md
├── prompt.md
├── README.md
├── student-list.html
├── tsconfig.base.json
├── tsconfig.json
├── turbo.json
├── vitest.config.mts
└── yarn.lock
```
