import { useEffect } from "react";
import { startOrderListener } from "../notifications/orderListener";
import { registerForPush } from "../notifications/push";

export function useInitNotifications() {
  useEffect(() => {
    registerForPush();
    const sub = startOrderListener();

    return () => {
      sub.unsubscribe();
    };
  }, []);
}
