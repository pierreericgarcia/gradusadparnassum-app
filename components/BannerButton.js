import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

export function BannerButton({ children, style, ...props }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.pressedButton : {},
        style,
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.black,
    paddingVertical: spacing.lg,
    width: '100%',
  },
  pressedButton: {
    backgroundColor: colors.pressed,
  },
});
