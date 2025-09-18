import icons from "@/constants/icons";
import images from "@/constants/images";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const NoTransaction = () => {
  const router = useRouter();
  return (
    <View className="flex-1 flex-col gap-y-5 justify-center items-center">
      {/* <Ionicons
        size={100}
        className="text-coffeeTheme-textLight"
        name="receipt"
      /> */}
      <Image
        source={images.revenue_4}
        // tintColor={"white"}
        style={{ width: 250, height: 125 }}
        resizeMode="contain"
        // className="size-6"
      />
      <Text className="font-rubik-semibold text-xl">No Transactions yet</Text>
      <Text className="font-rubik text-lg text-center text-coffeeTheme-textLight">
        Start tracking your finances by adding your first transaction.
      </Text>
      <TouchableOpacity
        onPress={() => router.replace("./create")}
        className="py-2 flex flex-row items-center px-5 justify-center gap-x-3 bg-coffeeTheme-primary rounded-full"
      >
        <Image
          source={icons.plus_circle}
          tintColor={"white"}
          className="size-6"
        />

        <Text className="text-white text-lg font-rubik-medium ">
          Add Transaction
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoTransaction;
