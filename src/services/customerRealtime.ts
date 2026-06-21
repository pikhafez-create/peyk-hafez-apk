import { supabase } from "../lib/supabase";

export function subscribeCustomerOrders(callback: () => void) {
  return supabase
    .channel("customer-orders")
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
