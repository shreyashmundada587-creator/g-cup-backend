import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>G-CUP Dashboard</Text>

      <TouchableOpacity
        style={styles.userButton}
        onPress={() => router.push("/(staff)/dashboard")}
      >
        <Text style={styles.buttonText}>User Panel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.adminButton}
        onPress={() => router.push("/(admin)/dashboard")}
      >
        <Text style={styles.buttonText}>Admin Panel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
  },
  userButton: {
    backgroundColor: "#1E293B",
    padding: 18,
    width: 250,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  adminButton: {
    backgroundColor: "#111827",
    padding: 18,
    width: 250,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});