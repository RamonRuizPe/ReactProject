import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screen/HomeScreen';
import MovieScreen from './src/screen/MovieScreen.js';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createStackNavigator()

export default function App() {
  const [fontLoaded] = useFonts({
    Koulen: require("./assets/fonts/Koulen-Regular.ttf"),
    Akshar_Light: require("./assets/fonts/Akshar-Light.ttf"),
    Akshar_Medium: require("./assets/fonts/Akshar-Medium.ttf")
  })

  return fontLoaded ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name='home' 
        component={HomeScreen} 
        options={{headerShown: false}}/>
        <Stack.Screen 
        name='movie' 
        component={MovieScreen} 
        options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  ) : (<AppLoading />);
}
