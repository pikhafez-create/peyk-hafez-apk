import React from "react";
import { View } from "react-native";

export default function Box({ children, style }: any) {
  return (
    <View
      style={[
        {
          padding: 12,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#ddd",
          marginBottom: 10,
          backgroundColor: "#fff",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
