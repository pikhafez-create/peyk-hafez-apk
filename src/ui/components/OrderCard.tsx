import React from "react";
import { Text, Pressable } from "react-native";
import Box from "./Box";

export default function OrderCard({ order, onPress }: any) {
  return (
    <Box>
      <Text style={{ fontWeight: "bold" }}>Order #{order.id}</Text>
      <Text>Pickup: {order.pickup}</Text>
      <Text>Dropoff: {order.dropoff}</Text>
      <Text>Status: {order.status}</Text>

      {onPress && (
        <Pressable
          onPress={onPress}
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: "#000",
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            باز کردن
          </Text>
        </Pressable>
      )}
    </Box>
  );
}
