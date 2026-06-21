import { useEffect, useState } from "react";
import { getETA } from "../services/etaService";

export function useETA(origin: any, destination: any) {
  const [eta, setEta] = useState<any>(null);

  useEffect(() => {
    if (!origin || !destination) return;

    let interval = setInterval(async () => {
      const result = await getETA(origin, destination);
      setEta(result);
    }, 10000); // هر 10 ثانیه آپدیت

    return () => clearInterval(interval);
  }, [origin, destination]);

  return eta;
}
