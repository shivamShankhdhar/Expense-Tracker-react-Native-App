import SafeScreen from "@/components/safe-area-view";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "../global.css";

export default function RootLayout() {
  const [isFontLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (isFontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isFontLoaded]);

  if (!isFontLoaded) {
    return null;
  }
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeScreen>
    </ClerkProvider>
  );
}
