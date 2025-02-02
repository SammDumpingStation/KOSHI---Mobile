import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import Container from "../../components/Container";
import Button from "../../components/Button";
import icons from "../../constants/icons";
import { router } from "expo-router";
import { useUserContext } from "../../context/UserContext";

const FindCars = () => {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [searchText, setSearchText] = useState("");
  const { color } = useUserContext();

  const dismissKeyboard = () => {
    Keyboard.dismiss(); // Hides the keyboard
    inputRef.current?.blur(); // Blurs the TextInput
  };
  const handleFocusInput = () => {
    inputRef.current?.focus(); // Focus the TextInput when the button is pressed
  };

  useEffect(() => {
    // Listen for when the keyboard is dismissed
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      inputRef.current?.blur(); // Blur the input when the keyboard is dismissed
    });

    // Clean up the listener when the component is unmounted
    return () => {
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <Container>
      {/* Invoke dismissKeyboard correctly */}
      <TouchableWithoutFeedback
        className="h-full"
        onPress={dismissKeyboard} // Call the function directly, without the arrow function
      >
        <View className="space-y-14 my-auto">
          <View className="items-center space-y-2">
            <Text className="text-3xl font-black">Looking for a car?</Text>
            <Text className="max-w-[300px] text-center text-gray_inactive text-base">
              Find it quickly with our easy-to-use search tool.
            </Text>
          </View>
          <View>
            <SearchBar
              otherStyles="mb-6"
              query={query}
              setQuery={setQuery}
              ref={inputRef}
            />
            <Button
              label="Find Cars Now"
              icon={icons.search}
              iconTint={color.white_secondary}
              onPress={
                searchText
                  ? () => {
                      router.push("/home");
                      setSearchText("");
                    }
                  : handleFocusInput
              }
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default FindCars;
