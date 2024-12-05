import {View, Text, Image} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Features = ({name, image, description, bgColor}) => {
  return (
    <View className={`p-4 ${bgColor} rounded-xl space-y-2 mb-7`}>
      <View className="flex-row items-center space-x-1">
        <Image source={image} style={{height: hp(4), width: hp(4)}} />
        <Text
          style={{fontSize: wp(4.8)}}
          className="font-semibold text-gray-700 ml-5">
          {name}
        </Text>
      </View>
      <Text
        className="text-gray-500 font-medium mt-3"
        style={{fontSize: wp(3.8)}}>
        {description}
      </Text>
    </View>
  );
};

export default Features;
