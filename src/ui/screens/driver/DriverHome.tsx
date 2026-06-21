import React from "react";
import { View, Text, Pressable } from "react-native";
import { getOrder, setOrder } from "../../../state/orderStore";
import { updateOrderStatus } from "../../../core/orderEngine";

export default function DriverHome() {
  const order = getOrder();

  if (!order || order.driverId !== "driver-1") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>سفارشی وجود ندارد</Text>
      </View>
    );
  }

  const accept = () => {
    setOrder(updateOrderStatus(order, "DRIVER_ACCEPTED"));
  };

  const pickup = () => {
    setOrder(updateOrderStatus(order, "PICKED_UP"));
  };

  const deliver = () => {
    setOrder(updateOrderStatus(order, "DELIVERED"));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>وضعیت: {order.status}</Text>

      <Pressable onPress={accept}><Text>قبول</Text></Pressable>
      <Pressable onPress={pickup}><Text>تحویل گرفتن</Text></Pressable>
      <Pressable onPress={deliver}><Text>تحویل نهایی</Text></Pressable>
    </View>
  );
}
