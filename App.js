import React from 'react';
import Home from "./components/Home"
import Meal from './components/Meal'
import Favorites from './components/Favorites'
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ title: 'TheMealFront' }}/>
      <Stack.Screen name="Meal" component={Meal} options={{ title: 'Recipe' }}/>
      <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites' }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

