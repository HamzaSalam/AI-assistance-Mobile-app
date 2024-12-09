import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Features from '../components/Features';
import FeatureScreen from './FeatureScreen';
import {dummyMessages} from '../constants/constant';
import {apiCall} from '../api/openAi';
import Tts from 'react-native-tts';
// import Voice from '@react-native-community/voice';

const Home = () => {
  const [message, setMessage] = useState([]);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const ScrollViewRef = useRef();

  // const speechStartHandler = e => {
  //   console.log('speech start handler');
  // };
  // const speechEndHandler = e => {
  //   setRecording(false);
  //   console.log('speech end handler');
  // };
  // const speechResultsHandler = e => {
  //   console.log('speech result handler: ', e);
  //   const text = e.value(0);
  //   setResult(text);
  // };
  // const speechErrorHandler = e => {
  //   console.log('speech error handler: ', e);
  // };

  const startRecording = async () => {
    setRecording(true);
    Tts.stop();
    // try {
    //   await Voice.start('en-GB'); //en-GB
    // } catch (error) {
    //   console.log('error: ', error);
    // }
  };

  const stopRecording = async () => {
    try {
      // await Voice.stop();
      setRecording(false);
      //fetch response from ChatGPT
      fetchResponse();
    } catch (error) {
      console.log('error: ', error);
    }
  };

  // it also remember the old messages with this below code
  const fetchResponse = () => {
    if (result.trim().length > 0) {
      let newMessages = [...message];
      newMessages.push({role: 'user', content: result.trim()});
      setMessage([...newMessages]);
      updateScrollView();
      setLoading(true);
      apiCall(result.trim(), newMessages).then(res => {
        // console.log('got api data: ', res);
        setLoading(false);
        if (res.success) {
          setMessage([...res.data]);
          updateScrollView();
          setResult('');
          startTextToSpeach(res.data[res.data.length - 1]);
        } else {
          Alert.alert('Error: ', res.msg);
        }
      });
    }
  };

  const startTextToSpeach = messages => {
    if (Platform.OS === 'ios') {
      // IOS
      if (!messages.content.includes('https')) {
        Tts.speak(message.content, {
          iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
          rate: 0.5,
        });
      }
    } else {
      // its for android
      if (!messages.content.includes('https')) {
        setSpeaking(true);
        Tts.speak(message.content, {
          androidParams: {
            KEY_PARAM_PAN: -1,
            KEY_PARAM_VOLUME: 0.5,
            KEY_PARAM_STREAM: 'STREAM_VOICE_CALL',
          },
        });
      }
    }
  };

  const updateScrollView = () => {
    setTimeout(() => {
      ScrollViewRef?.current?.ScrollToEnd({animated: true});
    }, 200);
  };

  const stopSpeaking = () => {
    Tts.stop();
    setSpeaking(false);
  };

  const clear = () => {
    setMessage([]);
    Tts.stop();
  };

  useEffect(() => {
    // voice handler event
    // Voice.onSpeechStart = speechStartHandler;
    // Voice.onSpeechEnd = speechEndHandler;
    // Voice.onSpeechResults = speechResultsHandler;
    // Voice.onSpeechError = speechErrorHandler;

    // test to speach
    Tts.addEventListener('tts-start', event => console.log('start', event));
    Tts.addEventListener('tts-progress', event =>
      console.log('progress', event),
    );
    Tts.addEventListener('tts-finish', event => console.log('finish', event));
    Tts.addEventListener('tts-cancel', event => console.log('cancel', event));

    // return () => {
    //   //destory the voice instance
    //   Voice.destroy().then(Voice.removeAllListeners);
    // };
  }, []);

  // console.log('result: ', result);

  return (
    <View className="flex-1 bg-emerald-50">
      <SafeAreaView className="mx-5 flex-1 flex">
        {/* bot icon */}
        <View className="flex-row justify-center -mt-3">
          <Image
            source={require('../../assets/images/bot.png')}
            style={{width: hp(20), height: hp(20)}}
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
              style={{height: hp(61)}}
              className="bg-neutral-200 rounded-3xl p-4">
              <ScrollView
                ref={ScrollViewRef}
                className="space-y-4"
                bounces={false}
                showsVerticalScrollIndicator={false}>
                {message.map((messages, index) => {
                  if (messages.role === 'asisstant') {
                    if (messages.content.includes('https')) {
                      // its an ai image
                      return (
                        <View key={index} className="flex-row justify-start">
                          <View className="p-2 rounded-2xl flex bg-emerald-100 rounded-tl-none">
                            <Image
                              source={{uri: messages.content}}
                              className="rounded-2xl"
                              resizeMode="contain"
                              style={{height: wp(60), width: wp(60)}}
                            />
                          </View>
                        </View>
                      );
                    } else {
                      // text response
                      return (
                        <View
                          key={index}
                          style={{width: wp(70)}}
                          className="rounded-xl p-4 rounded-tl-none bg-emerald-100 mb-4">
                          <Text>{messages.content}</Text>
                        </View>
                      );
                    }
                  } else {
                    // use input
                    return (
                      <View key={index} className="flex-row justify-end mb-4">
                        <View
                          style={{width: wp(70)}}
                          className="rounded-xl p-4 rounded-tr-none bg-white">
                          <Text>{messages.content}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <FeatureScreen />
        )}
        {/* recording , clear and stop buttons */}
        <View className="flex justify-center items-center">
          {loading ? (
            <Image
              source={require('../../assets/images/loading.gif')}
              style={{width: hp(7), height: hp(7)}}
            />
          ) : recording ? (
            <TouchableOpacity onPress={stopRecording}>
              {/* recording stop button */}
              <Image
                source={require('../../assets/images/micanim.png')}
                style={{width: hp(7), height: hp(7)}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startRecording} className="mb-4">
              {/* recording start button */}
              <Image
                source={require('../../assets/images/mic.png')}
                style={{width: hp(7), height: hp(7)}}
              />
            </TouchableOpacity>
          )}

          {message.length > 0 && (
            <TouchableOpacity
              onPress={clear}
              className="bg-neutral-400 rounded-3xl p-2 absolute right-10">
              <Text className="text-white font-semibold">Clear</Text>
            </TouchableOpacity>
          )}
          {speaking && (
            <TouchableOpacity
              onPress={stopSpeaking}
              className="bg-red-400 rounded-3xl p-2 absolute left-10">
              <Text className="text-white font-semibold">Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
