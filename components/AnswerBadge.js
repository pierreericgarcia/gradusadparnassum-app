import React from 'react';
import { StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';

export function AnswerBadge({ children, success, fail, style, ...props }) {
  const getColors = () => {
    if (success) {
      return ['#00BCB4', '#C4E86B'];
    }
    if (fail) {
      return ['#FA0874', '#FFC446'];
    }

    return [colors.black];
  };

  return (
    <LinearGradient
      colors={getColors()}
      style={[styles.badge, style]}
      {...props}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxxs,
  },
});
