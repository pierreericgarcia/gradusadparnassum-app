import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import ScoresScreen from '../screens/ScoresScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import LinkingConfiguration from './LinkingConfiguration';
import React from 'react';
import { GameProvider } from '../contexts/GameContext';
import { Easing } from 'react-native';
import { UnmountOnBlur } from '../components/UnmountOnBlur';

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

function RootNavigator() {
  const fadeIn = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  const transitionSpec = {
    open: {
      animation: 'timing',
      config: {
        duration: 100,
        easing: Easing.inOut(Easing.ease),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 100,
        easing: Easing.inOut(Easing.ease),
      },
    },
  };

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: fadeIn,
        transitionSpec: transitionSpec,
      }}
    >
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen options={{ gestureEnabled: false }} name="Game">
        {props => (
          <UnmountOnBlur>
            <GameProvider>
              <GameScreen {...props} />
            </GameProvider>
          </UnmountOnBlur>
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
