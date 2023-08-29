import Ionicons from '@expo/vector-icons/Ionicons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { customFontsToLoad } from '../theme';
import { Asset } from 'expo-asset';

const imagesToPreload = [
  require('../assets/images/gradusadparnassum.jpeg'),
  require('../assets/images/brahms.png'),
  require('../assets/images/faure.png'),
  require('../assets/images/handel.png'),
  require('../assets/images/liszt.png'),
  require('../assets/images/paganini.png'),
  require('../assets/images/saint-saens.png'),
];

export function useLoadedAssets() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Promise.all([
          Font.loadAsync(Ionicons.font),
          Font.loadAsync(customFontsToLoad),
          ...imagesToPreload.map(image => Asset.loadAsync(image)),
        ]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
