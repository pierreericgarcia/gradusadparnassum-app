import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme';
import { useGame } from '../contexts/GameContext';
import { Text } from './Text';
import { secondsToTimeFormat } from '../utils';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    position: 'relative',
    width: '100%',
  },
});

export function GameHeader() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { gameStats, timeLeft } = useGame();

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="close-outline" size={30} color="black" />
      </TouchableOpacity>
      <Text weight="light">{secondsToTimeFormat(timeLeft)}</Text>
      <Text weight="light">{gameStats.score} pts</Text>
    </View>
  );
}
