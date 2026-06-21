import { supabase } from "../lib/supabase";
import { sendLocalNotification } from "./push";

export function startOrderListener() {
  return supabase
    .channel("order-events")
    .on("postgres_changes", {
      event: "UPDATE",
      schema: "public",
      table: "orders",
    }, (payload) => {
      const order = payload.new;

      if (order.status === "ASSIGNED") {
        sendLocalNotification(
          "سفارش تخصیص یافت",
          "راننده برای سفارش شما انتخاب شد"
        );
      }

      if (order.status === "PICKED_UP") {
        sendLocalNotification(
          "سفارش در مسیر است",
          "راننده سفارش شما را تحویل گرفت"
        );
      }

      if (order.status === "DELIVERED") {
        sendLocalNotification(
          "سفارش تحویل شد",
          "پرداخت شما آماده است"
        );
      }
    })
    .subscribe();
}
