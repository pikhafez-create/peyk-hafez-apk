import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { supabase } from "../../../lib/supabase";
import { useAuthStore } from "../../../state/authStore";
import { sendPush } from "../../../services/sendPush";
import { startDriverLocationStream } from "../../../services/driverLocationStream";

export default function DriverDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const { user } = useAuthStore();

  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("driver_id", user?.id);

    setOrders(data || []);
  };

  const updateStatus = async (order: any, status: string) => {
    await supabase
      .from("orders")
      .update({ status })
      .eq("id", order.id);

    const { data } = await supabase
      .from("profiles")
      .select("push_token")
      .eq("id", order.customer_id)
      .single();

    if (data?.push_token) {
      await sendPush(
        data.push_token,
        "Order Update",
        status
      );
    }

    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();

    if (user?.id) {
      startDriverLocationStream(user.id);
    }
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>DRIVER LIVE</Text>

      <FlatList
        data={orders}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.id}</Text>

            <Button title="Start" onPress={() => updateStatus(item, "in_progress")} />
            <Button title="Done" onPress={() => updateStatus(item, "delivered")} />
          </View>
        )}
      />
    </View>
  );
}
