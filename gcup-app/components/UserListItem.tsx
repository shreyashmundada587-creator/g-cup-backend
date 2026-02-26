import { View, Text } from "react-native";

export default function UserListItem({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
      }}
    >
      <Text style={{ color: "#CBD5E1" }}>{name}</Text>
      <Text style={{ color: "#22C55E", fontWeight: "bold" }}>
        {value}
      </Text>
    </View>
  );
}