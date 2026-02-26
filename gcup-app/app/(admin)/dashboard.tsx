import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useDashboard } from "../../hooks/useDashboard";
import StatCard from "../../components/StatCard";
import SectionCard from "../../components/SectionCard";
import UserListItem from "../../components/UserListItem";

export default function AdminDashboard() {
  const { data, loading } = useDashboard("admin");

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0F172A",
        }}
      >
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  if (!data) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0F172A",
        }}
      >
        <Text style={{ color: "white" }}>No data available</Text>
        </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0F172A" }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: "white",
          marginBottom: 20,
        }}
      >
        Admin Dashboard
      </Text>

      {/* Stats Section */}
      <StatCard title="Total Carpenters" value={data.totalCarpenters} />
      <StatCard title="G-Stars Awarded" value={data.gstarsAwarded} />
      <StatCard title="Pending Bills" value={data.pendingBills} />
      <StatCard title="Total Payouts" value={`₹${data.totalPayouts}`} />

      {/* Top Carpenters */}
      <SectionCard title="Top Carpenters">
        {data.topCarpenters?.map((c: any) => (
          <UserListItem
            key={c.id}
            name={c.name}
            value={`${c.gstars} G-Stars`}
          />
        ))}
      </SectionCard>

      {/* Recent Transactions */}
      <SectionCard title="Recent Transactions">
        {data.recentTransactions?.map((t: any) => (
          <UserListItem
            key={t.id}
            name={t.userName}
            value={`+${t.amount} G-Stars`}
          />
        ))}
      </SectionCard>
    </ScrollView>
  );
}