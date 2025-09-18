import React, { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SafeScreen = ({ children }: { children: ReactNode }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
      }}
      className={`pt-${insets.top} flex-1 h-full bg-coffeeTheme-background`}
    >
      {children}
    </View>
  );
};

export default SafeScreen;
