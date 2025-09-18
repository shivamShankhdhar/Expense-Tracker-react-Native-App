import images from "@/constants/images";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import * as React from "react";

import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const [error, setError] = React.useState<string | null>(null);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      if ((err as any).errors?.[0]?.code === "form_identifier_exists") {
        setError("That email address is already in use, Please try another.");
      } else {
        setError("An error occured, Please try again.");
      }
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("./");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View className="flex px-5 flex-col justify-center items-center h-full">
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
        {/* <Image
          source={images.revenue_2}
          resizeMode="contain"
          className="w-full"
        /> */}
        <Text className="text-2xl font-rubik-bold">Verify your email</Text>
        <TextInput
          value={code}
          className="bg-white border border-gray-300  rounded-xl w-full my-5 py-5 px-5"
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity
          className="bg-coffeeTheme-primary w-4/12 h-14 flex justify-center items-center rounded-xl"
          onPress={onVerifyPress}
        >
          <Text className="text-white font-rubik-semibold text-lg">Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      style={{ flex: 1 }}
    >
      <View className="flex flex-col px-5 justify-center items-center flex-1">
        <Image
          source={images.revenue_2}
          resizeMode="contain"
          className="w-full h-80"
        />
        <Text className="font-rubik-semibold text-4xl w-full text-center my-5">
          Sign up
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
          onChangeText={(email) => setEmailAddress(email)}
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
          onPress={onSignUpPress}
        >
          <Text className="text-white text-lg font-rubik-medium">Sign Up</Text>
        </TouchableOpacity>
        <View
          className="mt-6"
          style={{ display: "flex", flexDirection: "row", gap: 3 }}
        >
          <Text className="font-rubik">Already have an account?</Text>
          <Link href="/sign-in">
            <Text className="font-rubik-medium">Sign in</Text>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
