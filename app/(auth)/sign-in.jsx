import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import Container from "@/components/Container";
import FormInput from "@/components/FormInput";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import icons from "@/constants/icons";
import { signInSchema } from "../../utils/validation";
import Button from "@/components/Button";
import { signInUser } from "@/lib/supabase";
import { useUserContext } from "../../context/UserContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingModal from "../../components/Modals/LoadingModal";

const SignIn = () => {
  const { setAuthId, color } = useUserContext();
  const [databaseError, setDatabaseError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm({
    resolver: yupResolver(signInSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Watch email and password
  const email = watch("email");
  const password = watch("password");
  const emailValue = getValues("email");
  const passwordValue = getValues("password");

  useEffect(() => {
    setDatabaseError("");
  }, [email, password]);

  const onSubmit = async (data) => {
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      const { user, error } = await signInUser(data.email, data.password);
      //set the context we made
      if (user && user.user) {
        const authUserId = user.user.id; // Get the Auth ID from the user
        setAuthId(authUserId); // Set the Auth ID in the context
        router.replace("/home");
      } else {
        // Handle the case where sign-in was successful but no user data is returned
        setDatabaseError(error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container scroll={true} bg={color.green_primary} pb={false} ph={false}>
      <LoadingModal loadingModal={isLoading} label="Checking Credentials" />
      <Text className="mt-2 px-4 mb-14 text-[40px] text-white font-black">
        Sign In
      </Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="bg-white px-4 pt-8 rounded-tl-3xl rounded-tr-3xl flex-1"
      >
        <View className="mb-4 space-y-2">
          <Text className="text-2xl font-black">Welcome Back!</Text>
          <Text className="text-base text-gray_inactive">
            Please Log-in your credentials
          </Text>
        </View>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              label="email"
              placeholder="Email"
              value={value}
              errorMessage={errors.email ? errors.email.message : ""} // Use formState's errors
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              label="password"
              placeholder="Password"
              value={value}
              errorMessage={errors.password ? errors.password.message : ""} // Use formState's errors
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
        <ErrorMessage value={databaseError} />
        <View className="pb-8 pt-4">
          <Text className="text-gray_inactive text-right">
            Forgot Password?
          </Text>
        </View>

        <Button
          label="Log-in"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting || !!databaseError}
          isLoading={isSubmitting}
        />
      </KeyboardAvoidingView>

      <View className="bg-white px-4 flex-1">
        <View className="flex-row space-x-2  items-center my-8">
          <View className="w-full flex-1 border-t border-gray_border max-h-[1px]"></View>
          <Text className="text-gray_inactive text-center">
            OR CONTINUE WITH
          </Text>
          <View className="w-full flex-1 border-t border-gray_border max-h-[1px] "></View>
        </View>
        <View className=" justify-between mb-6">
          <Button
            label="Continue with Google"
            withIcon={icons.googleIcon}
            disabled={true}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (!emailValue || !passwordValue) {
                reset({
                  email: "",
                  password: "",
                });
                clearErrors(); // Ensure both errors are cleared
              }
              setDatabaseError("");
              router.push("/sign-up");
            }}
          >
            <Text className="text-center mt-8 text-base text-green_primary font-bold">
              Create an Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default SignIn;
