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
    borderColor: '#222429',
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
  },
  pressedButton: {
    backgroundColor: colors.pressed,
  },
});
