import React from "react";
import { View, Text } from "react-native";
import { getOrder } from "../../../state/orderStore";

export default function CustomerHome() {
  const order = getOrder();

  const canShowPayment = order?.status === "DELIVERED";

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {order ? (
        <>
          <Text>وضعیت: {order.status}</Text>

          {canShowPayment && (
            <Text>پرداخت آماده است → وارد Payment Screen شوید</Text>
          )}
        </>
      ) : (
        <Text>سفارشی وجود ندارد</Text>
      )}
    </View>
  );
}
