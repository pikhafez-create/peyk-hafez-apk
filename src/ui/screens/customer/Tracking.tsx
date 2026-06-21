import React from "react";
import { View, Text } from "react-native";
import LiveMap from "./LiveMap";

export default function Tracking() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Text>وضعیت سفارش: در حال انجام</Text>
      </View>

      <LiveMap />
    </View>
  );
}
