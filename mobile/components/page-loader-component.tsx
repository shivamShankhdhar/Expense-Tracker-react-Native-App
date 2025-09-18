import React from "react";
import { ActivityIndicator, View } from "react-native";

const PageLoaderComponent = () => {
  return (
    <View className="flex h-full justify-center items-center">
      <ActivityIndicator size={"large"} className="text-coffeeTheme-primary" />
    </View>
  );
};

export default PageLoaderComponent;
