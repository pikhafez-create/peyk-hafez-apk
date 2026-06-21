import { supabase } from "../lib/supabase";

export function subscribeDriverOrders(driverId: string, callback: (orders: any) => void) {
  return supabase
    .channel("driver-orders")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "orders",
        filter: `driver_id=eq.${driverId}`,
      },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();
}
