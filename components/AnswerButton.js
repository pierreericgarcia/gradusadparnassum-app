import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme';

export function AnswerButton({ children, style, ...props }) {
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
    backgroundColor: colors.lightBlack,
    borderRadius: 20,
    justifyContent: 'center',
  },
  pressedButton: {
    backgroundColor: colors.pressed,
  },
});
