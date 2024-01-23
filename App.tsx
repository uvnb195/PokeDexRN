import React from 'react';
import Detail from './src/screens/Detail';
import Home from './src/screens/Home';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type StackParams = {
  Home: undefined;
  Detail: {
    pokemonId: string;
    name: string;
  };
};

const RootStack = createNativeStackNavigator<StackParams>();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Detail" component={Detail} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
