import React from "react";
import { View, Text, Pressable } from "react-native";
import { getOrder, setOrder } from "../../../state/orderStore";
import { createPayment } from "../../../core/paymentEngine";
import { setPayment } from "../../../state/paymentStore";
import { updateOrderStatus } from "../../../core/orderEngine";

export default function PaymentScreen() {
  const order = getOrder();

  const pay = () => {
    if (!order) return;

    const payment = createPayment(order);
    setPayment(payment);

    setOrder(updateOrderStatus(order, "PAID"));
  };

  if (!order) {
    return (
      <View>
        <Text>سفارشی وجود ندارد</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18 }}>پرداخت سفارش</Text>

      <Text>مبلغ: 50000</Text>
      <Text>وضعیت سفارش: {order.status}</Text>

      <Pressable
        onPress={pay}
        style={{ backgroundColor: "black", padding: 15, marginTop: 20 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          پرداخت آنلاین
        </Text>
      </Pressable>
    </View>
  );
}
