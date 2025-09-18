import images from "@/constants/images";
import { useSignIn, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { user, isLoaded: userLoaded } = useUser();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("./");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: unknown) {
      if ((err as any).errors?.[0]?.code === "form_password_incorrect") {
        setError("Password is incorrect, Please try again.");
      } else {
        setError("An error occured, Please try again.");
      }
    }
  };
  if (!userLoaded) return null;
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      style={{ flex: 1 }}
    >
      <View className="flex flex-col px-5 justify-center items-center flex-1">
        <Image
          source={images.revenue_4}
          resizeMode="contain"
          className="w-full h-80"
        />
        <Text className="font-rubik-semibold text-4xl w-full text-center my-5">
          Welcome Back
        </Text>
        {error ? (
          <View className="w-full flex flex-row bg-red-200 py-4 rounded-xl my-5 px-5 border border-red-300">
            <Text className="text-sm flex-1 font-rubik text-red-600">
              {error ? error : "Something went wrong"}
            </Text>
            <TouchableOpacity onPress={() => setError(null)}>
              <Text className="text-red-600">X</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          className="w-full py-3 border text-lg font-rubik-medium border-gray-300 rounded-xl px-5 bg-white"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          className="w-full py-3 border my-2 text-lg font-rubik-medium border-gray-300 rounded-xl px-5 bg-white"
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity
          className="my-2 w-full py-3 flex justify-center items-center rounded-xl bg-coffeeTheme-primary"
          onPress={onSignInPress}
        >
          <Text className="text-white text-lg font-rubik-medium">Sign In</Text>
        </TouchableOpacity>
        <View
          className="mt-6"
          style={{ display: "flex", flexDirection: "row", gap: 3 }}
        >
          <Text className="font-rubik">Don't have an account?</Text>
          <Link href="./sign-up">
            <Text className="font-rubik-medium">Sign up</Text>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
