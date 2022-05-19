import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import homeScreen from './src/screen/homeScreen';
import movieScreen from './src/screen/movieScreen.js';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createStackNavigator()

export default function App() {
  const [fontLoaded] = useFonts({
    Koulen: require("./assets/fonts/Koulen-Regular.ttf"),
  })

  return fontLoaded ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name='home' 
        component={homeScreen} 
        options={{headerShown: false}}/>
        <Stack.Screen 
        name='movie' 
        component={movieScreen} 
        options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  ) : (<AppLoading />);
}
