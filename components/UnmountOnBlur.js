import React, { useState, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export function UnmountOnBlur({ children }) {
  const isFocused = useIsFocused();
  const [opacity] = useState(new Animated.Value(0));
  const [shouldRender, setShouldRender] = useState(isFocused);

  useEffect(() => {
    if (isFocused) {
      setShouldRender(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setShouldRender(false);
      });
    }
  }, [isFocused]);

  if (!shouldRender) return null;

  return <Animated.View style={{ flex: 1, opacity }}>{children}</Animated.View>;
}
