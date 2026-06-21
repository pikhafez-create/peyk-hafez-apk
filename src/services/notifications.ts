import * as Notifications from "expo-notifications";

export async function registerForPush() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status;
}

export async function sendLocalNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null,
  });
}
