import React from 'react';
import Home from "./components/Home"
import Meal from './components/Meal'
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Meal" component={Meal} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

