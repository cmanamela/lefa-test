# LEFA Front-end

## Requirements

### NodeJS 8+ and NPM
Node can be downloaded from [here](https://nodejs.org/en/download/). The project maintainer recommends using yarn package manager which can be installed by running `npm install -g yarn` once you've installed NodeJS, but if you prefer you can also keep using npm.

### React Native CLI
run `yarn global add react-native-cli`

### For Android

#### Java JDK 8
The Java JDK can be downloaded from [here](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

#### Android Studio with Android 9.0 (Pie) SDK
Android Studio may be downloaded from [here](https://developer.android.com/studio)

## Set up the project
1. **Clone the project:** Run `git clone https://github.com/GeromeSchutte/LEFA-rest-app.git`
2. **Navigate to the project folder**: Run `cd LEFA-rest-app`
3. **Install packages**: Run `yarn`
4. **Add java.exe directory location to the path**
5. **Add the Android SDK directory location to an environment variable (system variable on windows) named ANDROID_HOME**

## Running the project
### For Android
1. Start an Android device emulator or connect an Android device with USB debugging enabled to your computer.
2. Navigate to the project's root folder, and run `yarn run-android`

## Generating a signed APK
Follow the steps listed [here](https://facebook.github.io/react-native/docs/signed-apk-android.html#adding-signing-config-to-your-app-s-gradle-config).

### Troubleshooting APK generation
#### Duplicate resources 
Follow second solution in answer listed [here](https://stackoverflow.com/a/53260522).

## Troubleshooting
### Couldn't resolve module x
The build server sometimes struggles to recompile when imports are added, removed or changed. Close the build server and rerun `yarn run-android`.

### Registration doesn't work if platform is set to Spree
Registration using the Spree API requires an admin user Spree API Key. At runtime, the API key is read from `/src/Shared/API/APIConstants.js` and included in the registration request, but for security reasons, the actual API key is to be left `undefined` as this repo is public. If registration is to be tested using the Spree platform, generate an API key using an admin user, and copy it into the `X-Spree-Token` field in `/src/Shared/API/APIConstants.js`. Do not commit the changes to this file.