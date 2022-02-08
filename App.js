import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from './app/screens/HomeScreen';
import ListScreen from './app/screens/ListScreen';
import ResultScreen from './app/screens/ResultScreen';
import SearchScreen from './app/screens/SearchScreen';

const Stack = createNativeStackNavigator();

/*
  The stack navigator handles the navigation in our app.
 */
const StackNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'CityPop' }}/>
      <Stack.Screen name="List" component={ListScreen} options={{ title: 'CityPop' }}/>
      <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'CityPop' }}/>
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'CityPop' }}/>
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  )
};


