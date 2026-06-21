import React, { useMemo, useRef } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

export default function OrderBottomSheet() {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "80%"], []);

  return (
    <BottomSheet ref={sheetRef} index={1} snapPoints={snapPoints}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          ثبت سفارش پیک
        </Text>

        <TextInput
          placeholder="آدرس مبدا"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
          }}
        />

        <TextInput
          placeholder="آدرس مقصد"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
          }}
        />

        <Pressable
          style={{
            backgroundColor: "black",
            padding: 15,
            marginTop: 15,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            ثبت درخواست
          </Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
}
