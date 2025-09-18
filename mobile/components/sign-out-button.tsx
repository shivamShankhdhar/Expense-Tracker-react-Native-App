import icons from "@/constants/icons";
import { useClerk } from "@clerk/clerk-expo";
import { Alert, Image, TouchableOpacity } from "react-native";

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    try {
      Alert.alert("Logout", "Are you sure you wants to Logout", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await signOut();
          },
        },
      ]);
      // await signOut();
      // // Redirect to your desired page
      // Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <TouchableOpacity
      className="bg-white p-3 mr-2 rounded-full"
      onPress={handleSignOut}
    >
      <Image
        resizeMode="contain"
        tintColor={"black"}
        source={icons.logout}
        className="size-6 "
      />
    </TouchableOpacity>
  );
};
