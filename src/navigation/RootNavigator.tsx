import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen";
import TrackingMap from "../ui/screens/customer/TrackingMap";

import { useAuthStore } from "../state/authStore";

import AdminDashboard from "../ui/screens/admin/AdminDashboard";
import DriverDashboard from "../ui/screens/driver/DriverDashboard";
import CustomerDashboard from "../ui/screens/customer/CustomerDashboard";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, role, init, loading } = useAuthStore();

  useEffect(() => {
    init();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : role === "admin" ? (
          <Stack.Screen name="Admin" component={AdminDashboard} />
        ) : role === "driver" ? (
          <Stack.Screen name="Driver" component={DriverDashboard} />
        ) : (
          <>
            <Stack.Screen name="Customer" component={CustomerDashboard} />
            <Stack.Screen name="TrackingMap" component={TrackingMap} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
