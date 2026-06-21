import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { getOrder, setOrder } from "../../../state/orderStore";
import { updateOrderStatus } from "../../../core/orderEngine";

export default function AdminHome() {
  const order = getOrder();
  const [driver] = useState("driver-1");

  const approve = () => {
    if (!order) return;
    setOrder(updateOrderStatus(order, "APPROVED"));
  };

  const assign = () => {
    if (!order) return;
    setOrder({
      ...updateOrderStatus(order, "ASSIGNED"),
      driverId: driver,
    });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>پنل ادمین</Text>

      {order && (
        <>
          <Text>وضعیت: {order.status}</Text>

          <Pressable onPress={approve} style={{ padding: 10, backgroundColor: "blue", marginTop: 10 }}>
            <Text style={{ color: "white" }}>تأیید سفارش</Text>
          </Pressable>

          <Pressable onPress={assign} style={{ padding: 10, backgroundColor: "green", marginTop: 10 }}>
            <Text style={{ color: "white" }}>تخصیص راننده</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}
