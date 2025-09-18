import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import React from "react";

const AppLaypout = () => {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) return null;
  // <View className="flex flex-1 flex-col justify-center items-center">
  //   <ActivityIndicator
  //     size={"large"}
  //     className="text-coffeeTheme-primary"
  //   />
  // </View>
  if (!isSignedIn && isLoaded) return <Redirect href={"./sign-in"} />;
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AppLaypout;
