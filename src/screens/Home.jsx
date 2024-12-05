import {View, Text, SafeAreaView, Image} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Home = () => {
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="mx-5 flex-1 flex">
        {/* bot icon */}
        <View className="flex-row justify-center">
          <Image
            source={require('../../assets/images/bot.png')}
            style={{width: hp(15), height: hp(15)}}
          />
        </View>
        {/* features || messages */}
      </SafeAreaView>
    </View>
  );
};

export default Home;
