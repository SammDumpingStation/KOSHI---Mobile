import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import Container from "@/components/Container";
import icons from "@/constants/icons";
import { useUserContext } from "../context/UserContext";
import { supabase } from "@/lib/supabase";
import { SkypeIndicator } from "react-native-indicators";

const index = () => {
  const { isLoading, setAuthId, color } = useUserContext();

  useEffect(() => {
    const checkUserSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        return; // Handle error appropriately (e.g., show a message)
      }

      if (data.session) {
        const userId = data.session.user.id;
        setAuthId(userId);
        if (!isLoading) {
          setTimeout(() => {
            router.replace("/home");
          }, 1500);
        }
      } else {
        if (!data.session && !isLoading) {
          router.replace("/sign-in");
        }
      }
    };
    checkUserSession();
  }, [isLoading]);
  console.log(color.green_primary);
  

  return (
    <Container
      bg={color.green_primary}
      scroll={false}
      pb={false}
      ph={false}
      pt={false}
    >
      <View className="relative flex-1 space-x-4 justify-center items-center flex-row ">
        <Image
          source={icons.logo}
          className="h-24 w-24"
          resizeMode="contain"
          tintColor={color.white_secondary}
        />
        <View className="items-center">
          <Text className="font-black text-5xl text-white py-1 tracking-[7px]">
            KOSHI
          </Text>
          <Text className="text-white text-[13px] -mt-3">
            Helping you pick the right ride
          </Text>
        </View>
      </View>
      <View className="items-center space-y-4 justify-center absolute bottom-16 left-0 right-0">
        <SkypeIndicator className="" color="white" />
        <Text className="text-white text-base font-bold">
          {isLoading
            ? "Checking if you have logged in before....."
            : "Redirecting....."}
        </Text>
      </View>
    </Container>
  );
};

export default index;
