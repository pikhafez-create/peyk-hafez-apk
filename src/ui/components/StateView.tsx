import React from "react";
import { View, Text } from "react-native";

export default function StateView({ type }: { type: "loading" | "empty" | "error" }) {
  let text = "";

  if (type === "loading") text = "در حال بارگذاری...";
  if (type === "empty") text = "داده‌ای موجود نیست";
  if (type === "error") text = "خطا در دریافت اطلاعات";

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Text>{text}</Text>
    </View>
  );
}
