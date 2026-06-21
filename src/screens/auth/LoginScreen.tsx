import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useAuthStore } from "../../state/authStore";

export default function LoginScreen() {
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Text>LOGIN</Text>

      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginVertical: 8 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginVertical: 8 }}
      />

      <Button
        title="Login"
        onPress={() => login(email, password)}
      />
    </View>
  );
}
