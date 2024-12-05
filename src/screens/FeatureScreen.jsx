import {View, Text} from 'react-native';
import React from 'react';
import Features from '../components/Features';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const FeatureScreen = () => {
  return (
    <View style={{height: hp(60)}} className="space-y-4">
      <Text
        style={{fontSize: wp(6.5)}}
        className="font-semibold text-gray-700 mb-5">
        Features
      </Text>
      <Features
        name="ChatGPT"
        image={require('../../assets/images/chatgpt.png')}
        description="ChatGPT can provide you with instant and knowledgeable responses, assist
        you with creative ideas on a wide range of topics"
        bgColor="bg-emerald-200"
      />
      <Features
        name="DALL-E"
        image={require('../../assets/images/dalle.png')}
        bgColor="bg-purple-200"
        description="DALL-E can generate imaginative and diverse image from textual description, expanding the boundries of visual creativity"
      />
      <Features
        name="Smart AI"
        image={require('../../assets/images/smartai.png')}
        bgColor="bg-cyan-200"
        description="A powerfull voice assistance with the abilities of ChatGPT and DALL-E providing you the best of both worlds"
      />
    </View>
  );
};

export default FeatureScreen;
