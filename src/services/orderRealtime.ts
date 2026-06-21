import { supabase } from "../lib/supabase";

export function subscribeOrders(callback: () => void) {
  return supabase
    .channel("orders-realtime")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "orders",
      },
      () => {
        callback();
      }
    )
    .subscribe();
}
