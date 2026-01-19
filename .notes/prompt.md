## Project Structure

```
react-native/
├── apps
│   ├── native
│   │   ├── app
│   │   │   ├── _layout.tsx
│   │   │   └── index.tsx
│   │   ├── assets
│   │   │   └── images
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
│       ├── src
│       │   ├── pages
│       │   │   ├── api
│       │   │   │   └── hello.ts
│       │   │   ├── _app.tsx
│       │   │   ├── _document.tsx
│       │   │   └── index.tsx
│       │   └── global.css
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
│   ├── app
│   │   ├── api
│   │   │   ├── generated
│   │   │   │   ├── default
│   │   │   │   │   └── default.ts
│   │   │   │   └── model
│   │   │   │       ├── createStudentBody.ts
│   │   │   │       ├── index.ts
│   │   │   │       ├── student.ts
│   │   │   │       └── updateStudentBody.ts
│   │   │   └── axios-client.ts
│   │   ├── features
│   │   │   └── home
│   │   │       └── screen.tsx
│   │   ├── provider
│   │   │   ├── safe-area
│   │   │   │   ├── index.tsx
│   │   │   │   ├── index.web.tsx
│   │   │   │   ├── use-safe-area.ts
│   │   │   │   └── use-safe-area.web.ts
│   │   │   ├── index.tsx
│   │   │   ├── NextTamaguiProvider.tsx
│   │   │   ├── query-client-provider.tsx
│   │   │   ├── ToastViewport.tsx
│   │   │   └── ToastViewport.web.tsx
│   │   ├── index.ts
│   │   ├── nativewind-env.d.ts
│   │   ├── orval.config.js
│   │   ├── package.json
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── types.d.ts
│   ├── config
│   │   ├── src
│   │   │   ├── animations.ts
│   │   │   ├── fonts.ts
│   │   │   ├── index.ts
│   │   │   └── tamagui.config.ts
│   │   └── package.json
│   └── ui
│       ├── src
│       │   ├── components
│       │   │   ├── button.tsx
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
│       ├── package.json
│       └── tsconfig.json
├── server
│   ├── index.ts
│   ├── package-lock.json
│   ├── package.json
│   └── students.json
├── package.json
├── README.md
├── tsconfig.base.json
├── tsconfig.json
├── turbo.json
└── yarn.lock
```

- Understand my Above project structure.
- I have created this monorepo project with tamagui stater kit template.
- It used tamagui component & solito for cross-platform usage.
- I have also integrated the nativewind so we can use the tailwindcss with tamagui components as well.
- I want you help in creating demo project of student crud.
- API is already made, just consume them with orval generated client which using react-query code.
- I will give you html file with design, based on it you give me screen I asked for.
- Don't do anything yourself without asking for it, you only do what I say.
- For now I am giving you orvaL generated files & screen file, understand them for next task.
- before doing any task ask me question so you can do better code in that.
- remember the syntax I use in that file