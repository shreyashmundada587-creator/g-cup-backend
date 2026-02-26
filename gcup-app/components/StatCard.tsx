import { View, Text } from "react-native";

export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <View
      style={{
        backgroundColor: "#1E293B",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
      }}
    >
      <Text style={{ color: "#94A3B8", fontSize: 14 }}>{title}</Text>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 4,
        }}
      >
        {value}
      </Text>
    </View>
  );
}