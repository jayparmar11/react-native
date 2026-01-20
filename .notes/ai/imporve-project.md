You Are a Full Stack Developer having lead experience with monorepos, typescript, react, expo, next.js, shared ui, reusable components, configs.
Help me to restructure my monorepo.

There are issues in tsconfig, package.json that you need to fix without breaking the apps.

The project is of tamagui stater kit, which having expo + next.js in apps

and shared ui, shared app(screen, providers), and shared config packages.

in this i integrated the nativewind with RNR(react-native-reusables) my self.

I have prepare demo for both tamagui and RNR student crud to show to client,

its also having seperate server folder having simple node server having file based apis which i used in app.



in this i want industries standard way to manage monorepo with industries standard configs(tsconfig, package.json and other) and file structure.


1. restructure package
- package/app having api as well which i want to separate as packages/api
- in api i used orval to generate react-query client from openapi doc.
2. i have multiple files in apps and packages which i want in one place, if not possible then place it one location and import in others.
also refactor other things you see in it.
3. i want change in app directory its not looking good, i dont know how to explain things to client, so help to restructure or refine it as well.


# Project Structure

```
react-native/
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
│   │   │       ├── ...
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
│   │   │   ├── home
│   │   │   │   └── screen.tsx
│   │   │   ├── rnr
│   │   │   │   └── students
│   │   │   │       ├── add.tsx
│   │   │   │       ├── list.tsx
│   │   │   │       └── update.tsx
│   │   │   └── students
│   │   │       ├── add.tsx
│   │   │       ├── list.tsx
│   │   │       └── update.tsx
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
├── server
│   ├── index.ts
│   ├── package-lock.json
│   ├── package.json
│   └── students.json
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
# DONT MAKE ASSUMPTIONS, or GUESS code of my project, IF You want code for any file or files just tell me I will provide that, don't give solution without if you dont have answer to why question of it. IF YOU HAVE QUESTION just ask, dont give solution without proper context.
