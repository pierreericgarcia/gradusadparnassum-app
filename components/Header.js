import React, { useEffect, useRef } from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigationState, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import icon from '../assets/images/gradusadparnassum.jpeg';
import { colors, spacing } from '../theme';

const styles = StyleSheet.create({
  closeButton: {
    left: spacing.lg,
    position: 'absolute',
    zIndex: 1,
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    height: 40,
  },
});

export function Header() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const currentRoute = useNavigationState(
    state => state.routes[state.index].name,
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: currentRoute !== 'Home' ? 1 : 0,
      duration: currentRoute !== 'Home' ? 100 : 0,
      useNativeDriver: true,
    }).start();
  }, [currentRoute]);

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <TouchableOpacity
        style={styles.closeButton}
        disabled={currentRoute === 'Home'}
        onPress={() => navigation.navigate('Home')}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <Ionicons name="close-outline" size={30} color="black" />
        </Animated.View>
      </TouchableOpacity>
      <Image style={styles.image} source={icon} resizeMode="contain" />
    </View>
  );
}
