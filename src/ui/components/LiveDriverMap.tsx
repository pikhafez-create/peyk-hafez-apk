import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { subscribeDriverLocation } from "../../services/liveDriverListener";

export default function LiveDriverMap({ driverId }: any) {
  const [position, setPosition] = useState<any>(null);

  useEffect(() => {
    const sub = subscribeDriverLocation(driverId, (loc) => {
      setPosition({
        latitude: loc.lat,
        longitude: loc.lng,
      });
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  if (!position) return null;

  return (
    <MapView
      style={{ height: 300, marginTop: 20 }}
      initialRegion={{
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker coordinate={position} title="Driver Live" />
    </MapView>
  );
}
