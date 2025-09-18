import icons from "@/constants/icons";
import { useTransactions } from "@/hooks/use-transaction";
import { formatDate } from "@/lib/utils";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NoTransaction from "./no-transaction";

const CATEGORY_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  "Food & Drinks": "fast-food",
  Shopping: "cart",
  Transportation: "car",
  Entertainment: "film",
  Bills: "receipt",
  Income: "cash",
  Other: "ellipsis-horizontal",
};

// Shape of a transaction
export interface ITransaction {
  id: string; // assuming your DB has an id
  title: string;
  amount: number;
  category: string;
  created_at: string;
}

interface TransactionItemProps {
  transaction: ITransaction;
  onDelete: (id: string) => void;
}

const TransactionItem = ({ transaction, onDelete }: TransactionItemProps) => {
  const isIncome = transaction.amount > 0;
  const iconName = CATEGORY_ICONS[transaction.category] || "pricetag-outline";

  return (
    <View className="felx flex-row items-center  w-full bg-white px-3 gap-x-3 py-5 rounded-xl shadow-md">
      <View className="rounded-full bg-coffeeTheme-background p-3">
        <Ionicons
          name={iconName}
          size={24}
          className={`text-coffeeTheme-${isIncome ? "income" : "expense"}`}
          color={isIncome ? "green" : "red"}
          //   style={{ marginRight: 12 }}
        />
      </View>
      <View className="flex-1">
        <Text className="font-rubik-medium text-lg" numberOfLines={1}>
          {transaction.title}
        </Text>
        <Text className="text-coffeeTheme-textLight text-md " numberOfLines={1}>
          {transaction.category}
        </Text>
      </View>
      <View className="flex flex-col px-3">
        <Text
          className="text-lg font-rubik"
          style={{ color: isIncome ? "green" : "red" }}
        >
          {isIncome ? "+" : "-"}₹
          {!isIncome
            ? transaction.amount.toString().slice(1)
            : transaction.amount}
        </Text>
        <Text className="text-sm font-rubik">
          {formatDate(transaction.created_at)}
        </Text>
      </View>
      <View className="px-4 border-l border-coffeeTheme-border flex items-center justify-center">
        <TouchableOpacity onPress={() => onDelete(transaction.id)}>
          <Image
            source={icons.delete_icon}
            tintColor={"red"}
            className="w-6 h-12 "
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface RecentTransactionsProps {
  transactions: ITransaction[];
  onDelete: (id: string) => void;
}

const RecentTransactions = ({
  transactions,
  onDelete,
}: RecentTransactionsProps) => {
  const { user } = useUser();
  const { loadData } = useTransactions(user?.id!);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await loadData();
    } catch (error) {
      throw new Error("somehthing went wrong");
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <View className="flex-1 flex flex-col gap-y-5">
      <Text className="font-rubik-semibold text-xl">
        Recent Transactions ({transactions.length})
      </Text>

      {transactions && transactions?.length > 0 ? (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ paddingBottom: 20, gap: 10 }}
          renderItem={({ item }) => (
            <TransactionItem
              transaction={item}
              onDelete={() => onDelete(item.id)}
            />
          )}
        />
      ) : (
        <NoTransaction />
      )}
    </View>
  );
};

export default RecentTransactions;
