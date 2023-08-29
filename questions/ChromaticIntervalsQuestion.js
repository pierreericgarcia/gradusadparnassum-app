import React from 'react';
import { View } from 'react-native';
import { AnswerButton } from '../components/AnswerButton';
import { Text } from '../components/Text';
import { spacing } from '../theme';

export default function ChromaticIntervalsQuestion({ onPress }) {
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
      {[
        {
          id: 1,
          label: 'Demi-ton',
          alias: 'DT',
        },
        {
          id: 2,
          label: 'Ton',
          alias: 'T',
        },
      ].map(({ id, label, alias }) => (
        <AnswerButton
          style={{ flexBasis: '100%', height: '48%' }}
          onPress={() => onPress({ id, label: alias })}
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
