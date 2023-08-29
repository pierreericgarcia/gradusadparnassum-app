import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import ScoresScreen from '../screens/ScoresScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import LinkingConfiguration from './LinkingConfiguration';
import React from 'react';
import { GameProvider } from '../contexts/GameContext';

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen options={{ gestureEnabled: false }} name="Game">
        {props => (
          <GameProvider>
            <GameScreen {...props} />
          </GameProvider>
        )}
      </Stack.Screen>
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="Scores"
        component={ScoresScreen}
      />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="NotFound"
        component={NotFoundScreen}
      />
    </Stack.Navigator>
  );
}
