# Welcome to Punzisa 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

## Useful Commands

### 1. Test that Depencies are Up to Date

Run the command bellow to check that all dependencies are up to date:

```
   npx expo install --check
```

### 2. Build Development Build Locally

Building a development build using eas can be costly and time consuming depending on the availability of compute and wait time in the build time which makes building locally optimal for local testing.

Run the following command to build a developoment build locally

```
eas build --profile [profile_name] --platform [target_platform] --local
```

So for example, to build a preview profile for the android platform, use the example below

```
eas build --profile preview --platform android --local
```

### 3. Install Local Development Build .apk to Android Virtual Device

Run this command

```
adb install [path_to_.apk_file]
```
