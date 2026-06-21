import React from "react";
import { Text } from "react-native";

export default function StatusBadge({ status }: any) {
  return (
    <Text
      style={{
        padding: 5,
        backgroundColor: "#eee",
        marginTop: 5,
      }}
    >
      {status}
    </Text>
  );
}
