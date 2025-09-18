import { API_URL } from "@/lib/api";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

interface ISummary {
  balance: number;
  income: number;
  expenses: number;
}

export const useTransactions = (userId: string) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState<ISummary>({
    balance: 0,
    income: 0,
    expenses: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data.data);
      //   console.log(data);
    } catch (error: any) {
      //   const e = error as AxiosError;
      console.log("Error fetching transactions", error.message);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setSummary(data);
      //   console.log("summary response:", data);
    } catch (error: any) {
      //   const e = error as AxiosError;
      console.log("Error fetching transactions summary", error.message);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;

    setLoading(true);

    try {
      //   we can fetch in parllel
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.log("Error loading data");
    } finally {
      setLoading(false);
    }
  }, [fetchTransactions, fetchSummary]);

  const deleteTransaction = async (id: string) => {
    try {
      if (!id) return;
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete transaction");
      loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error: any) {
      Alert.alert("Error", "Failed to delete Transaction");

      console.log("Error deleting transaction", error.message);
    }
  };
  return { loading, transactions, summary, loadData, deleteTransaction };
};
