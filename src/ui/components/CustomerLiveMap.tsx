import React from "react";
import MapView, { Marker } from "react-native-maps";

export default function CustomerLiveMap({ driverLocation }: any) {
  if (!driverLocation) return null;

  return (
    <MapView
      style={{ height: 300, marginTop: 20 }}
      initialRegion={{
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      <Marker coordinate={driverLocation} title="Driver" />
    </MapView>
  );
}
