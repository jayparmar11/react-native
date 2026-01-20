# [Simple EAS Tutorial](https://docs.expo.dev/tutorial/eas/introduction/)

- [Development Builds vs	Expo Go](https://docs.expo.dev/tutorial/eas/configure-development-build/#key-highlights)

## EAS process required for building apps
```sh
# 1. Install eas-cli as it will build our app on EAS server.
npm install -g eas-cli
# 2. Login to EAS account.
eas login
```

## Steps for building "Development Build"
```sh
# 1. Initialize and link the project to EAS
# - Its for first time process only, as we don't have eas.json config file.
# - It will ask you questions if you answer them properly.
# - Then it will update app.json with EAS services project id.
eas init
# 2. Configure project for EAS Build
# - It will create `eas.json` file with configuration of building our app at EAS services.
eas build:configure
# 3. Build development the app
# - It will also ask for keystore. if we don't have then it will generate on their server.
eas build --platform [android/ios/all] --profile development # select either android/ios/all
# 4. Run the app After above process done(may take while)
yarn dlx expo start
# 5. Switch to Development mode by pressing "s", if it showing "Using Expo Go", Then press a for android & i for ios.
```



## eas args:
```sh
build --platform [android/ios/all] # select platform in which you want to build app
build --p [android/ios/all] # short for `--platform`
build --profile [development/preview/production] # select which profile you what to build app
--message "Some message" # The message will appear on the EAS dashboard.
```



# Other helpful commands

```sh
# Monitor the build progress and read the build logs
eas build:list
```