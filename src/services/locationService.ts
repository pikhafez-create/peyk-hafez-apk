import * as Location from "expo-location";

let watchSubscription: any = null;

export async function startLiveLocation(callback: (coords: any) => void) {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    console.log("Permission denied");
    return;
  }

  watchSubscription = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 3000,
      distanceInterval: 5,
    },
    (location) => {
      callback({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  );
}

export function stopLiveLocation() {
  if (watchSubscription) {
    watchSubscription.remove();
    watchSubscription = null;
  }
}
