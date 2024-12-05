import {Text, SafeAreaView} from 'react-native';
import React from 'react';

import './global.css';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/navigations/Index';

const App = () => {
  return <AppNavigation />;
};

export default App;
