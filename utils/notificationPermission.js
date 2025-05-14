import {Platform, PermissionsAndroid} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';

/**
 * Request notification permissions for both Android and iOS platforms
 * @returns {Promise<boolean>} Whether permissions were granted
 */
export const requestNotificationPermission = async () => {
  try {
    // iOS permission request
    if (Platform.OS === 'ios') {
      const settings = await notifee.requestPermission({
        sound: true,
        alert: true,
        badge: true,
        criticalAlert: false,
        provisional: false,
      });
      return settings.authorizationStatus >= 1; // 0 = not determined, 1 = denied, 2 = authorized
    }

    // Android permission request (for API level 33+)
    if (Platform.OS === 'android') {
      // Create default channel
      await notifee.createChannel({
        id: 'default-channel',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      // Create events channel
      await notifee.createChannel({
        id: 'events-channel',
        name: 'Events Channel',
        importance: AndroidImportance.HIGH,
      });

      // For Android 13+ (API level 33+), we need to request the POST_NOTIFICATIONS permission
      if (parseInt(Platform.Version, 10) >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }

      // For Android below 33, permissions are granted by default when app is installed
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

/**
 * Check if notification permissions are granted
 * @returns {Promise<boolean>} Whether permissions are granted
 */
export const checkNotificationPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      const settings = await notifee.getNotificationSettings();
      return settings.authorizationStatus >= 2; // 2 = authorized
    }

    if (Platform.OS === 'android') {
      // For Android 13+ (API level 33+), check the POST_NOTIFICATIONS permission
      if (parseInt(Platform.Version, 10) >= 33) {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        return granted;
      }
      // For Android below 33, permissions are granted by default when app is installed
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking notification permission:', error);
    return false;
  }
};
