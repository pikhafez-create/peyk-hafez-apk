import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { supabase } from "../../../lib/supabase";
import { subscribeDriverLocation } from "../../../services/liveDriverLocation";
import { getDistance, estimateETA } from "../../../utils/geo";

export default function TrackingMap({ route }: any) {
  const { driverId } = route.params;

  const [location, setLocation] = useState({
    latitude: 35.6892,
    longitude: 51.3890,
  });

  const [distance, setDistance] = useState(0);
  const [eta, setEta] = useState(0);

  const destination = {
    latitude: 35.7000,
    longitude: 51.4000,
  };

  const fetchInitial = async () => {
    const { data } = await supabase
      .from("driver_locations")
      .select("*")
      .eq("driver_id", driverId)
      .single();

    if (data) {
      setLocation({
        latitude: data.lat,
        longitude: data.lng,
      });
    }
  };

  useEffect(() => {
    fetchInitial();

    const sub = subscribeDriverLocation(driverId, (loc) => {
      const newLoc = {
        latitude: loc.lat,
        longitude: loc.lng,
      };

      setLocation(newLoc);

      const dist = getDistance(
        newLoc.latitude,
        newLoc.longitude,
        destination.latitude,
        destination.longitude
      );

      setDistance(dist);
      setEta(estimateETA(dist));
    });

    return () => sub.unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={location} title="Driver" />
        <Marker coordinate={destination} title="Destination" />

        <Polyline
          coordinates={[location, destination]}
          strokeWidth={4}
        />
      </MapView>

      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          backgroundColor: "white",
          padding: 10,
        }}
      >
        <Text>Distance: {distance.toFixed(2)} km</Text>
        <Text>ETA: {eta.toFixed(0)} min</Text>
      </View>
    </View>
  );
}
