# React Native - Firebase - Setup

## Refs <!-- omit in toc -->

- [Expo using firebase](https://docs.expo.dev/guides/using-firebase/)
- [React Native FireBase Docs](https://rnfirebase.io/)

## Summary <!-- omit in toc -->

- [1. Add Firebase apps on Firebase console](#1-add-firebase-apps-on-firebase-console)
- [2. Install Firebase dependencies](#2-install-firebase-dependencies)
- [3. Edit `app.json` to support React Native Firebase](#3-edit-appjson-to-support-react-native-firebase)
  - [3.1. ios](#31-ios)
  - [3.2. android](#32-android)
  - [3.3. plugins](#33-plugins)
- [4. Request Notification Permissions](#4-request-notification-permissions)
- [5. Create listener for FCM](#5-create-listener-for-fcm)

## 1. Add Firebase apps on Firebase console

> [!IMPORTANT]
> On `app.json`, `android.package` and `ios.bundleIdentifier` must have the same value that was defined at the `packagename` field during the creation of an app on Firebase console

1. Access Firebase console and select the desired project
2. On project, create an app for Android and iOS
3. Add the SDK configurations exported by firebase console to the root of the react native project. The files are called:
   1. `google-services.json`
   2. `GoogleService-Info.plist`

## 2. Install Firebase dependencies

```bash
npx expo install @react-native-firebase/app @react-native-firebase/messaging expo-build-properties
```

## 3. Edit `app.json` to support React Native Firebase

### 3.1. ios

```json
"ios": {
  // ...
  "entitlements": {
    "aps-environment": "production"
  },
  "infoPlist": {
    "UIBackgroundModes": [
      "remote-notification"
    ]
  },
  "googleServicesFile": "./GoogleService-Info.plist",
  "bundleIdentifier": "your.package.name"
},
```

### 3.2. android

```json
"android": {
    // ...
    "googleServicesFile": "./google-services.json",
    "package": "your.package.name"
  },
```

### 3.3. plugins

```json
"plugins": [
  // ...
  "@react-native-firebase/app",
  "@react-native-firebase/messaging"
]
```

## 4. Request Notification Permissions

It's necessary to have the user's approval for this feature to work as expected. Here is a sample code:

```ts
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

// call this function whenever is more suitable
export async function requestUserPermission() {
  if (Platform.OS === 'android') {
    const authStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );

    console.log('Authorization status:', authStatus);
    return;
  }

  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    console.log('Authorization status:', authStatus);

    return;
  }
}
```

## 5. Create listener for FCM

It's necessary to create a listener to treat all the messages are received. Here is a custom hook example of using it:

```tsx
import {
  getMessaging,
  getToken,
  onMessage,
} from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export function useMessaging() {
  const [messages, setMessages] = useState<string[]>([]);
  const [token, setToken] = useState('');

  const messaging = getMessaging(); // get messaging instance

  const checkToken = async () => {
    const currToken = await getToken(messaging);
    setToken(currToken);
  };

  useEffect(() => {
    checkToken();

    const unsubOnMessage = onMessage(messaging, async (remoteMessage) => {
      const strMessage = JSON.stringify(remoteMessage);

      Alert.alert('A new FCM message arrived!', strMessage);
    });

    return () => {
      unsubOnMessage;
    };
  }, []);

  return {
    token,
    messages,
  };
}
```
