import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { getRoute } from "../../services/routeService";

export default function RouteMap({ origin, destination, driver }: any) {
  const [route, setRoute] = useState<any[]>([]);

  useEffect(() => {
    if (!origin || !destination) return;

    loadRoute();
  }, [origin, destination]);

  const loadRoute = async () => {
    const points = await getRoute(origin, destination);
    setRoute(points);
  };

  return (
    <MapView
      style={{ height: 350, marginTop: 20 }}
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {/* مسیر واقعی */}
      <Polyline
        coordinates={route}
        strokeWidth={4}
      />

      {/* راننده */}
      {driver && (
        <Marker coordinate={driver} title="Driver" />
      )}

      {/* مقصد */}
      <Marker coordinate={destination} title="Destination" />
    </MapView>
  );
}
