import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { subscribeDriverLocation } from "../../../state/gpsStore";
import { subscribeOrder } from "../../../state/orderStore";

export default function LiveMap() {
  const [driver, setDriver] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const unsubOrder = subscribeOrder(setOrder);
    const unsubGPS = subscribeDriverLocation(setDriver);

    return () => {
      unsubOrder();
      unsubGPS();
    };
  }, []);

  // فقط اگر سفارش تخصیص داده شده باشد
  if (!order || !order.driverId) {
    return null;
  }

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 35.6892,
        longitude: 51.3890,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {driver && (
        <Marker
          coordinate={{
            latitude: driver.latitude,
            longitude: driver.longitude,
          }}
          title="راننده اختصاص داده شده"
        />
      )}
    </MapView>
  );
}
