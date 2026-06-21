import * as Location from "expo-location";
import { supabase } from "../lib/supabase";

export async function startDriverLocationStream(driverId: string) {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") return;

  return Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 3000,
      distanceInterval: 5,
    },
    async (location) => {
      const { latitude, longitude } = location.coords;

      await supabase.from("driver_locations").upsert({
        driver_id: driverId,
        lat: latitude,
        lng: longitude,
        updated_at: new Date().toISOString(),
      });
    }
  );
}
