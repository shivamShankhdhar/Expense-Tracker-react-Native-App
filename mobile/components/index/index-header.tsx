import icons from "@/constants/icons";
import images from "@/constants/images";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SignOutButton } from "../sign-out-button";

const IndexHeader = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <View className="felx flex-row justify-between items-center py-2">
      {/* LEFT VIEW  */}
      <View className="flex flex-row flex-1 items-center">
        <Image
          resizeMode="contain"
          source={images.logo}
          style={{ width: 75, height: 75 }}
          className=""
        />
        <View className="flex flex-col">
          <Text className="font-rubik-medium text-coffeeTheme-textLight text-xl">
            Welcome,
          </Text>
          <Text numberOfLines={1} className="font-rubik-semibold text-sm">
            {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
          </Text>
        </View>
      </View>

      {/* RIGHT VIEW  */}
      <View className="flex flex-row gap-x-5 items-center">
        <TouchableOpacity
          onPress={() => {
            router.replace("./create");
          }}
          className="flex flex-row gap-x-3 px-5  py-2.5 rounded-full bg-coffeeTheme-primary  items-center"
        >
          <Image
            resizeMode="contain"
            source={icons.plus}
            tintColor={"white"}
            className="size-5"
          />
          <Text className=" font-rubik-medium text-white">Add</Text>
        </TouchableOpacity>
        <SignOutButton />
      </View>
    </View>
  );
};

export default IndexHeader;
