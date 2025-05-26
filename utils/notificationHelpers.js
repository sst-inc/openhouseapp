import notifee, {AndroidImportance} from '@notifee/react-native';
import {Platform} from 'react-native';
import {
  requestNotificationPermission,
  checkNotificationPermission,
} from './notificationPermission';

/**
 * Schedules a notification for an event
 * @param {Object} item - The event item
 * @returns {Promise<string|null>} - The notification ID or null if failed
 */
export async function scheduleEventNotification(item) {
  try {
    // First check if we have permission
    const hasPermission = await checkNotificationPermission();

    if (!hasPermission) {
      // Request permission if not granted
      const granted = await requestNotificationPermission();
      if (!granted) {
        console.log('Notification permission denied');
        return null;
      }
    }

    // Parse time and create date for trigger
    const eventTime = item.notifTime;

    // Handle different time formats (11.15am or 11.15 am)
    let hours, minutes;
    if (eventTime.includes('am') || eventTime.includes('pm')) {
      // Parse time like "11.15am" or "11.15 am"
      const timeStr = eventTime.replace(/\s/g, ''); // Remove spaces
      const isPM = timeStr.toLowerCase().includes('pm');
      const timeParts = timeStr.replace(/[ap]m/i, '').split('.');

      hours = parseInt(timeParts[0], 10);
      minutes = parseInt(timeParts[1], 10);

      if (isPM && hours < 12) hours += 12;
      if (!isPM && hours === 12) hours = 0;
    } else {
      // Parse time like "11.15"
      const [hoursStr, minutesStr] = eventTime.split('.');
      hours = parseInt(hoursStr, 10);
      minutes = parseInt(minutesStr, 10);
    }

    // Create a date object for the event
    const today = new Date();
    const triggerTime = new Date(today);
    triggerTime.setHours(hours, minutes, 0, 0);

    // If time has already passed today, schedule for tomorrow
    if (triggerTime.getTime() < Date.now()) {
      triggerTime.setDate(triggerTime.getDate() + 1);
    }

    console.log(`Scheduling notification for: ${triggerTime.toString()}`);

    // Create trigger
    const trigger = {
      type: notifee.TriggerType.TIMESTAMP,
      timestamp: triggerTime.getTime(),
    };

    // Get the appropriate channel ID based on platform
    const channelId = Platform.OS === 'android' ? 'events-channel' : undefined;

    // Create a trigger notification
    const id = await notifee.createTriggerNotification(
      {
        id: `event-${item.id}`, // Use a consistent ID for this event
        title: item.name,
        body: `${item.location} - Starting soon!`,
        android: {
          channelId: channelId,
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'default',
          },
          smallIcon: 'ic_launcher', // Use your app's icon
        },
        ios: {
          sound: 'default',
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
        },
      },
      trigger,
    );

    console.log('Notification scheduled with ID:', id);
    return id;
  } catch (error) {
    console.error('Failed to schedule notification:', error);
    return null;
  }
}

/**
 * Cancels a scheduled notification
 * @param {string} notificationId - The ID of the notification to cancel
 */
export async function cancelEventNotification(notificationId) {
  try {
    if (notificationId) {
      await notifee.cancelTriggerNotification(notificationId);
      console.log('Notification cancelled:', notificationId);
    }
  } catch (error) {
    console.error('Failed to cancel notification:', error);
  }
}

// Add background event handler for notifee
notifee.onBackgroundEvent(async ({type, detail}) => {
  switch (type) {
    case notifee.EventType.DISMISSED:
      console.log('Notification dismissed:', detail.notification);
      break;
    case notifee.EventType.PRESS:
      console.log('Notification pressed:', detail.notification);
      // Handle navigation or other actions here
      break;
    default:
      console.log('Unhandled background event:', type);
  }
});
