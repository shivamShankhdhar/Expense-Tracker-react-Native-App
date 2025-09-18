import React from "react";
import { Text, View } from "react-native";

interface IBalanceCardProps {
  balance: number;
  expenses: number;
  income: number;
}

const BalanceCard = ({ summary }: { summary: IBalanceCardProps }) => {
  return (
    <View className="flex flex-col shadow-md p-5 gap-y-2 rounded-xl border border-coffeeTheme-border bg-white my-5">
      <Text className="text-lg text-coffeeTheme-textLight  font-rubik-semibold">
        Total Balance
      </Text>
      <Text className="text-3xl font-rubik-semibold">₹{summary.balance}</Text>
      <View className="w-full flex flex-row justify-between">
        <View className="flex flex-col justify-center">
          <Text className="text-coffeeTheme-textLight font-rubik">Income</Text>
          {summary.income > 0 ? (
            <Text className="text-green-600 font-rubik text-2xl">
              +₹{summary.income}
            </Text>
          ) : (
            <Text className="text-coffeeTheme-textLight font-rubik text-2xl">
              ₹0
            </Text>
          )}
        </View>
        <View className="flex flex-col border-l justify-center border-coffeeTheme-border px-5">
          <Text className="text-coffeeTheme-textLight font-rubik">
            Expenses
          </Text>
          {parseFloat(summary.expenses.toString().slice(1)) > 0 ? (
            <Text className="text-red-600 font-rubik text-2xl">
              -₹{summary.expenses.toString().slice(1)}
            </Text>
          ) : (
            <Text className="text-coffeeTheme-textLight font-rubik text-2xl">
              ₹0
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;
