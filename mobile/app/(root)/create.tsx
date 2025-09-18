import icons from "@/constants/icons";
import { API_URL } from "@/lib/api";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const coffee_color = "#6F4E37";
const CATEGORIES = [
  { id: "food", name: "Food $ Drinks", icon: "fast-food" },
  { id: "shopping", name: "Shopping", icon: "cart" },
  { id: "transportation", name: "Transportation", icon: "car" },
  { id: "entertainment", name: "Entertainment", icon: "film" },
  { id: "bills", name: "Bills", icon: "receipt" },
  { id: "income", name: "Income", icon: "cash" },
  { id: "other", name: "Other", icon: "ellipsis-horizontal" },
];

const CreateTransactionScreen = () => {
  const router = useRouter();
  const { user } = useUser();

  const [data, setData] = useState<{
    title: string | null;
    category: string | null;
    amount: string | null;
  }>({ title: null, category: null, amount: null });

  const [isExpense, setIsExpense] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (parseFloat(data?.amount!) <= 0 || data?.amount === null)
      return Alert.alert("Error", "Please  transaction amount.");
    if (!data?.title?.trim())
      return Alert.alert("Error", "Please enter a transaction title.");
    if (!data?.category?.trim())
      return Alert.alert("Error", "Please select a transaction category.");

    setIsLoading(true);
    try {
      const formattedAmount = isExpense
        ? -Math.abs(parseFloat(data?.amount || "0.0"))
        : Math.abs(parseFloat(data?.amount || "0.0"));

      const payload = {
        ...data,
        amount: formattedAmount,
        userId: user?.id!,
      };
      const response = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData?.message || "Failed to create transaction");
      }
      Alert.alert("Success", "Transaction created successfully");
      setData({ title: null, category: null, amount: null });
      router.replace("./");
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex gap-y-5 px-5 py-5">
      {/* HEADER  */}
      <View className="flex flex-row gap-x-5 items-center justify-between">
        {/* BACK BUTTON  */}
        <TouchableOpacity
          className="p-3 rounded-full bg-white"
          onPress={() => router.replace("./")}
        >
          <Image
            source={icons.back_arrow}
            className="size-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text className="flex-1 font-rubik-semibold text-xl">
          Create Transaction
        </Text>
        {/* save button  */}
        <TouchableOpacity
          className="py-2.5 rounded-full flex gap-x-2.5 items-center flex-row bg-coffeeTheme-primary px-6"
          onPress={handleCreate}
          disabled={isLoading}
        >
          {isLoading && <ActivityIndicator size={18} color={"white"} />}
          <Text className="text-white font-rubik">Save</Text>
        </TouchableOpacity>
      </View>
      <View className="bg-white rounded-xl p-5">
        <View className="flex w-full  my-5 items-center justify-center flex-row gap-x-5">
          <TouchableOpacity
            onPress={() => setIsExpense(true)}
            className={`flex flex-row flex-1  gap-x-3 items-center justify-center border ${isExpense ? "bg-coffeeTheme-primary border-coffeeTheme-primary" : "bg-white border-coffeeTheme-border"} px-5 rounded-full py-3`}
          >
            <Ionicons
              color={isExpense ? "white" : "red"}
              className="text-white"
              size={25}
              name="arrow-down-circle"
            />
            <Text
              className={`text-xl font-rubik-bold ${isExpense ? "text-white" : "text-red-600"}`}
            >
              EXPENSE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsExpense(false)}
            className={`flex flex-1 flex-row gap-x-3 items-center border justify-center ${!isExpense ? "bg-coffeeTheme-primary border-coffeeTheme-primary" : "bg-white border-coffeeTheme-border"} px-5 rounded-full py-3`}
          >
            <Ionicons
              color={!isExpense ? "white" : "green"}
              className="text-white"
              size={25}
              name="arrow-up-circle"
            />
            <Text
              className={`text-xl font-rubik-bold ${!isExpense ? "text-white" : "text-green-600"}`}
            >
              INCOME
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row items-center gap-x-2">
          <Text
            style={{ fontSize: 36, lineHeight: 40 }}
            className="text-coffeeTheme-textLight font-rubik-bold my-5"
          >
            ₹
          </Text>
          <TextInput
            value={data?.amount || ""}
            placeholder="0.0"
            keyboardType="numeric"
            onChangeText={(value) => {
              const regex = /^\d{0,8}(\.\d{0,2})?$/;
              if (value === "" || regex.test(value)) {
                setData((prev) => ({ ...prev, amount: value }));
              }
            }}
            style={{
              fontSize: 36,
              lineHeight: 40,
              textAlignVertical: "center",
              includeFontPadding: false,
            }}
            className="flex-1 border-b border-coffeeTheme-border text-coffeeTheme-textLight placeholder:text-coffeeTheme-textLight font-rubik-bold"
          />
        </View>

        <View className="flex flex-row my-5 items-center justify-center px-2 py-2 rounded-xl border border-coffeeTheme-border">
          <Ionicons name="create-outline" color={coffee_color} size={25} />
          <TextInput
            value={data?.title || ""}
            placeholder="Transaction Title"
            // keyboardType="text"
            onChangeText={(value) =>
              setData((prev) => ({ ...prev, title: value }))
            }
            className="flex-1 text-lg  font-rubik text-coffeeTheme-text"
          />
        </View>
        <View className="flex flex-row items-center  my-5 gap-x-2 w-full">
          <Ionicons name="pricetag" color={"grey"} />
          <Text className="font-rubik-semibold text-2xl text-coffeeTheme-textLight">
            Categories
          </Text>
        </View>
        <View className="flex w-full flex-row gap-3 flex-wrap">
          {CATEGORIES.map((category, i) => {
            const isSelectedCategory = category.name === data.category;
            return (
              <TouchableOpacity
                className={`flex flex-row gap-x-2 border border-coffeeTheme-border items-center px-4 ${isSelectedCategory ? "bg-coffeeTheme-primary" : "bg-white"} rounded-full py-3`}
                key={`categories-list-${i}`}
                onPress={() =>
                  setData((prev) => ({ ...prev, category: category.name }))
                }
              >
                <Ionicons
                  size={20}
                  name={category.icon as any}
                  color={isSelectedCategory ? "white" : coffee_color}
                />
                <Text
                  className={`font-rubik text-lg ${isSelectedCategory ? "text-white" : "text-coffeeTheme-text"}`}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default CreateTransactionScreen;
