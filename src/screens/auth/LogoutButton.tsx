import React from "react";
import { Button } from "react-native";
import { useAuthStore } from "../../state/authStore";

export default function LogoutButton() {
  const logout = useAuthStore((s) => s.logout);

  return <Button title="Logout" onPress={logout} />;
}
