import { supabase } from "../lib/supabase";

export function subscribeDriverLocation(driverId: string, callback: (loc: any) => void) {
  return supabase
    .channel("driver-location")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "driver_locations",
        filter: `driver_id=eq.${driverId}`,
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();
}
