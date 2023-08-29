import { Asset } from 'expo-asset';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import * as Font from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import splashImage from './assets/images/splash.png';
import { customFontsToLoad } from './theme';

const imagesToPreload = [
  require('./assets/images/gradusadparnassum.jpeg'),
  require('./assets/images/brahms.png'),
  require('./assets/images/faure.png'),
  require('./assets/images/handel.png'),
  require('./assets/images/liszt.png'),
  require('./assets/images/paganini.png'),
  require('./assets/images/saint-saens.png'),
  require('./assets/images/hand-holding-book.png'),
  require('./assets/images/angel_1.png'),
  require('./assets/images/angel_2.png'),
];

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  return (
    <AnimatedAppLoader image={splashImage}>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    </AnimatedAppLoader>
  );
}

function AnimatedAppLoader({ children, image }) {
  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await Asset.fromModule(image).downloadAsync();
      await Promise.all([
        Font.loadAsync(Ionicons.font),
        Font.loadAsync(customFontsToLoad),
        ...imagesToPreload.map(image => Asset.loadAsync(image)),
      ]);
      setSplashReady(true);
    }

    prepare();
  }, [image]);

  if (!isSplashReady) {
    return null;
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

function AnimatedSplashScreen({ children, image }) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.expoConfig.splash.backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: Constants.expoConfig.splash.resizeMode || 'contain',
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}
