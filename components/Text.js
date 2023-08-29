import React from 'react';
import { Text as DefaultText } from 'react-native';
import { colors, fontSizes, typography } from '../theme';

export function Text({
  secondary = false,
  weight = 'regular',
  size = 'md',
  color = 'black',
  style,
  ...props
}) {
  const type = secondary ? 'secondary' : 'primary';
  const fontFamily = typography[type][weight];

  const textStyle = [
    { fontFamily, color: colors[color] },
    style,
    fontSizes[size],
  ];

  return <DefaultText style={textStyle} {...props} />;
}
