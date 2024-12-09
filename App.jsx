import {Text, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';

import './global.css';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/navigations/Index';
import {apiCall} from './src/api/openAi';

const App = () => {
  // useEffect(() => {
  //   // apiCall('create an image of a dog playing with the cat');
  // }, []);
  return <AppNavigation />;
};

export default App;
