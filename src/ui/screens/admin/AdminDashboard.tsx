import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Pressable } from "react-native";
import { supabase } from "../../../lib/supabase";
import { subscribeOrders } from "../../../services/orderRealtime";
import { getDrivers } from "../../../services/drivers";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);

  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    setOrders(data || []);
  };

  const fetchDrivers = async () => {
    const d = await getDrivers();
    setDrivers(d);
  };

  const assignDriver = async (orderId: string, driverId: string) => {
    await supabase
      .from("orders")
      .update({
        driver_id: driverId,
        status: "assigned",
      })
      .eq("id", orderId);

    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
    fetchDrivers();

    const sub = subscribeOrders(() => fetchOrders());

    return () => sub.unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        ADMIN DISPATCH PANEL
      </Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text>Order: {item.id}</Text>
            <Text>Status: {item.status}</Text>

            <Text style={{ marginTop: 8 }}>Assign Driver:</Text>

            {drivers.map((d) => (
              <Pressable
                key={d.id}
                onPress={() => assignDriver(item.id, d.id)}
                style={{
                  padding: 6,
                  backgroundColor: "#eee",
                  marginVertical: 4,
                }}
              >
                <Text>{d.email || d.id}</Text>
              </Pressable>
            ))}
          </View>
        )}
      />
    </View>
  );
}
