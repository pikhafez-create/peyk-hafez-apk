import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { supabase } from "../../../lib/supabase";
import { subscribeCustomerOrders } from "../../../services/customerRealtime";

export default function CustomerDashboard({ navigation }: any) {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    setOrders(data || []);
  };

  useEffect(() => {
    fetchOrders();

    const sub = subscribeCustomerOrders(() => fetchOrders());

    return () => sub.unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        CUSTOMER LIVE TRACKING
      </Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text>Order: {item.id}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Driver: {item.driver_id || "Not assigned"}</Text>

            {item.driver_id && (
              <Pressable
                onPress={() =>
                  navigation.navigate("TrackingMap", {
                    driverId: item.driver_id,
                  })
                }
                style={{
                  marginTop: 8,
                  padding: 8,
                  backgroundColor: "#ddd",
                }}
              >
                <Text>Track Driver</Text>
              </Pressable>
            )}
          </View>
        )}
      />
    </View>
  );
}
