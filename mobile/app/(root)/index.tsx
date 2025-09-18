import BalanceCard from "@/components/index/balance-card";
import IndexHeader from "@/components/index/index-header";
import RecentTransactions from "@/components/index/recent-transactions";
import PageLoaderComponent from "@/components/page-loader-component";
import { useTransactions } from "@/hooks/use-transaction";
import { useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { Alert, View } from "react-native";

export default function Page() {
  const { user } = useUser();
  const { loadData, summary, loading, transactions, deleteTransaction } =
    useTransactions(user?.id!);
  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) return <PageLoaderComponent />;

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete",
      "Are you sure you wants to delete this transaction.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteTransaction(id);
            // router.reload();
          },
        },
      ]
    );
  };

  return (
    <View
      className="flex h-full px-5 py-5
    "
    >
      {/* HEADER  */}
      <IndexHeader />
      {/* SUMMARY  */}
      <BalanceCard summary={summary} />

      {/* RECENT TRANSACTIONS  */}
      <RecentTransactions
        transactions={transactions || []}
        onDelete={handleDelete}
      />
    </View>
  );
}
