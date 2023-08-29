import React from 'react';
import { View } from 'react-native';
import { AnswerButton } from '../components/AnswerButton';
import { Text } from '../components/Text';
import { spacing } from '../theme';
import { diatonicModes } from '../music-theory/intervals';

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
      {Object.values(diatonicModes).map(({ id, label }) => (
        <AnswerButton
          style={{ flexBasis: '100%', height: '48%' }}
          onPress={() => onPress({ id, label })}
          key={id}
        >
          <Text weight="semiBold" color="white">
            {label}
          </Text>
        </AnswerButton>
      ))}
    </View>
  );
}
