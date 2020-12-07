import React, {useState} from 'react';
import login from './components/login';
import movie from './components/movie';
import signup from './components/signup';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="SignUp" component={signup} />
        <Stack.Screen name="Movie" component={movie} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
