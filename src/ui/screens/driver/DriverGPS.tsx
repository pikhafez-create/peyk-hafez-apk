import React, { useEffect } from "react";
import { startDriverLocationStream } from "../../../services/driverLocationStream";

export default function DriverGPS() {
  const driverId = "driver-1";

  useEffect(() => {
    startDriverLocationStream(driverId);
  }, []);

  return null;
}
