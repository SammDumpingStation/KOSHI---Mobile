import React, { useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import logos from "../../lib/logos";
import SearchBar from "../../components/SearchBar";
import Container from "../../components/Container";
import LogoCard from "../../components/LogoCard";
import BackButtonHeader from "../../components/BackButtonHeader";

export default function List() {
  // const route = useRoute();
  // const navigation = useNavigation();
  // const [search, setSearch] = useState("");
  // const { slot } = route.params || {}; // SLOT PASSING

  // console.log("Received Slot# :", slot);

  // const getSearch = (value) => {
  //   setSearch(value);
  // };

  // const selectedBrand = (brand) => {
  //   navigation.navigate("Model", { brand, slot }); // Forward brand and slot to MODEL PAGE
  //   console.log(brand, slot); //confirmation log
  // };

  return (
    <Container otherStyles="">
      <BackButtonHeader title="Choose a Car for Comparison" />
      <SearchBar otherStyles="mx-4" />
      <View>
        <Text className="mx-4 mt-9 font-black text-base">Select A Brand</Text>
        <FlatList
          className="pb-[100px]"
          contentContainerStyle={{
            alignItems: "center",
            gap: 14,
            paddingBottom: 180,
            paddingTop: 24,
          }}
          data={logos}
          numColumns={3}
          renderItem={({ item }) => (
            <View className="flex-1 basis-[115px] items-center">
              <LogoCard logo={item} />
            </View>
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    </Container>
  );
}
