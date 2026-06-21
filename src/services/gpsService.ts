import * as Location from "expo-location";

let watcher: any = null;

export async function startGPS(callback: (coords: any) => void) {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    return;
  }

  watcher = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 3000,
      distanceInterval: 5,
    },
    (loc) => {
      callback({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    }
  );
}

export function stopGPS() {
  if (watcher) {
    watcher.remove();
    watcher = null;
  }
}
