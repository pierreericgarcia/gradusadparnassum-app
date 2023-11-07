import React from 'react';
import { View } from 'react-native';
import { AnswerButton } from '../components/AnswerButton';
import { Text } from '../components/Text';
import { spacing } from '../theme';
import { scales_pattern } from '../music-theory/scales';

export default function ModeQuestion({ onPress }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        justifyContent: 'space-between',
      }}
    >
      {[scales_pattern.major, scales_pattern.minor].map(mode => (
        <AnswerButton
          style={{ flexBasis: '100%', height: '48%' }}
          onPress={() => onPress({ id: mode.id, label: mode.label })}
          key={mode.id}
        >
          <Text weight="semiBold" color="white">
            {mode.label}
          </Text>
        </AnswerButton>
      ))}
    </View>
  );
}
