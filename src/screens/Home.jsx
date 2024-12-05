import {View, Text, SafeAreaView, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Features from '../components/Features';
import FeatureScreen from './FeatureScreen';
import {dummyMessages} from '../constants/constant';

const Home = () => {
  const [message, setMessage] = useState(dummyMessages);
  return (
    <View className="flex-1 bg-slate-100">
      <SafeAreaView className="mx-5 flex-1 flex">
        {/* bot icon */}
        <View className="flex-row justify-center">
          <Image
            source={require('../../assets/images/bot.png')}
            style={{width: hp(30), height: hp(30)}}
          />
        </View>
        {/* features || messages */}
        {message.length > 0 ? (
          <View className="space-y-2 flex-1">
            <Text
              className="text-gray-700 font-semibold ml-1 mb-3 "
              style={{fontSize: wp(5)}}>
              Assistance
            </Text>
            <View
              style={{height: hp(58)}}
              className="bg-neutral-200 rounded-3xl">
              <ScrollView
                className="space-y-4"
                bounces={false}
                showsVerticalScrollIndicator={false}>
                {message.map((messages, index) => {
                  if (messages.role === 'asisstant') {
                    if (messages.content.includes('https')) {
                      // its an ai image
                    } else {
                      // text response
                    }
                  } else {
                    // use input
                  }
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <FeatureScreen />
        )}
      </SafeAreaView>
    </View>
  );
};

export default Home;
