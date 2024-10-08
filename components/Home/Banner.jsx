import { Text, View, Animated, Image } from "react-native";
import icons from "../../constants/icons";
import ContentContainer from "../ContentContainer";

const Banner = ({user = 'Guest'}) => {
  return (
    <ContentContainer otherStyles="mb-4">
      <View className="flex-row items-center space-x-4">
        <View className="w-12 h-12 bg-[#e2e2e2] rounded-full">
          <Image source={icons.user} className="h-6 w-6 m-auto" resizeMode="contain" tintColor="#9b9b9b" />
        </View>
        <View className="flex-row justify-between flex-1">
          <Text className="text-lg font-bold">{user}</Text>
          <Image
            source={icons.settings}
            className="h-6 w-6"
            tintColor="#5CB88F"
            resizeMode="contain"
          />
        </View>
      </View>
    </ContentContainer>
  );
};

export default Banner;
