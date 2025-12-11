import { initializeApp, ReactNativeFirebase } from '@react-native-firebase/app';
import { Platform } from 'react-native';

export default class FirebaseApp {
  static async connect() {
    let appOptions: ReactNativeFirebase.FirebaseAppOptions = {
      appId: '',
      projectId: '',
    };
    
    if (Platform.OS === 'android') {
      const {
        EXPO_PUBLIC_PROJECT_ID_ANDROID: projectId,
        EXPO_PUBLIC_APP_ID_ANDROID: appId,
      } = process.env;

      appOptions = {
        appId,
        projectId,
      };
    }

    if (Platform.OS === 'ios') {
      const {
        EXPO_PUBLIC_PROJECT_ID_IOS: projectId,
        EXPO_PUBLIC_APP_ID_IOS: appId,
      } = process.env;

      appOptions = {
        appId,
        projectId,
      };
    }

    console.log('firebase connecting...');
    const result = await initializeApp(appOptions);

    console.log('firebase', { result });
  }
}
